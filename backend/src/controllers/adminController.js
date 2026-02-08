const { User, Book, Borrow, ActivityLog } = require("../models/index");

// Internal logging helper
const createLog = async (data) => {
  try {
    const newLog = new ActivityLog(data);
    await newLog.save();
  } catch (error) {
    console.error('Failed to save activity log:', error);
  }
};
exports.createLog = createLog; // Export for internal use in other controllers

// --- Dashboard Section ---

exports.getDashboardStats = async (req, res) => {
  try {
    // Auto-update overdue status for ALL active borrows
    const now = new Date();
    await Borrow.updateMany(
      { status: 'borrowing', dueDate: { $lt: now } },
      { $set: { status: 'overdue' } }
    );

    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalBooks = await Book.countDocuments();
    const activeBorrows = await Borrow.countDocuments({ status: 'borrowing' });
    const overdueBorrows = await Borrow.countDocuments({ status: 'overdue' });
    const returnedBorrows = await Borrow.countDocuments({ status: 'returned' });

    const borrowingBooks = await Borrow.aggregate([
      { $match: { status: 'borrowing' } },
      { $group: { _id: "$bookId", title: { $first: "$bookTitle" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).then(results => results.map(item => ({
      bookId: item._id,
      title: item.title,
      saveCount: item.count
    })));

    const overdueRecords = await Borrow.find({ status: 'overdue' })
      .populate('userId', 'name email')
      .sort({ dueDate: 1 })
      .limit(10);

    const overdueUsers = overdueRecords.map(record => ({
      userName: record.userId?.name || "Người dùng ẩn",
      userEmail: record.userId?.email || "N/A",
      bookTitle: record.bookTitle,
      dueDate: record.dueDate
    }));

    const revenueData = await Borrow.aggregate([
      { $match: { status: 'returned' } },
      { $group: { _id: null, total: { $sum: { $add: [{ $ifNull: ["$fee", 0] }, { $ifNull: ["$lateFee", 0] }] } } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    res.json({ totalUsers, totalBooks, activeBorrows, overdueBorrows, returnedBorrows, revenue: totalRevenue, borrowingBooks, overdueUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- User Management Section ---

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
    const borrowStats = await Borrow.aggregate([
      { $group: { _id: "$userId", activeBorrows: { $sum: { $cond: [{ $eq: ["$status", "borrowing"] }, 1, 0] } }, overdueBorrows: { $sum: { $cond: [{ $eq: ["$status", "overdue"] }, 1, 0] } } } }
    ]);

    const usersWithStats = users.map(user => {
      const stats = borrowStats.find(s => s._id?.toString() === user._id.toString()) || { activeBorrows: 0, overdueBorrows: 0 };
      const lastActive = user.lastActive || user.createdAt;
      const diffMins = Math.floor((Date.now() - new Date(lastActive).getTime()) / 60000);
      return { ...user, activeBorrows: stats.activeBorrows, overdueBorrows: stats.overdueBorrows, isOnline: diffMins < 5, lastActiveMinutes: diffMins };
    });

    res.json(usersWithStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    if (!['user', 'admin', 'librarian'].includes(role)) return res.status(400).json({ message: "Vai trò không hợp lệ" });

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    await createLog({ user: req.user?.name || 'Admin', userId: req.user?._id || userId, action: 'UPDATE_ROLE', category: 'ADMIN', detail: `Thay đổi vai trò của ${user.name} thành ${role}`, status: 'SUCCESS' });
    res.json({ message: "Cập nhật vai trò thành công", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userToDelete = await User.findById(userId);
    if (userToDelete) {
      await createLog({ user: req.user?.name || 'Admin', userId: req.user?._id || userId, action: 'DELETE_USER', category: 'ADMIN', detail: `Xóa tài khoản người dùng: ${userToDelete.name} (${userToDelete.email})`, status: 'SUCCESS' });
    }
    await User.findByIdAndDelete(userId);
    res.json({ message: "Đã xóa người dùng" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Activity Logs Section ---

exports.getActivityLogs = async (req, res) => {
  try {
    const { category, user, startDate, endDate, page = 1, limit = 20 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (user) query.user = { $regex: user, $options: 'i' };
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    const logs = await ActivityLog.find(query).sort({ timestamp: -1 }).limit(limit * 1).skip((page - 1) * limit).exec();
    const count = await ActivityLog.countDocuments(query);
    res.json({ logs, totalPages: Math.ceil(count / limit), currentPage: page, totalLogs: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
