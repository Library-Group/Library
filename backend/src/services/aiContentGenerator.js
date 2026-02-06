const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIContentGenerator {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    }

    async generateChapters(book) {
        const { title, author, genre, contentSummary } = book;
        const authorName = typeof author === 'string' ? author : author?.name || 'Tác giả không rõ';

        const prompt = `Bạn là một nhà văn Việt Nam chuyên nghiệp. Hãy viết 5 đoạn văn ngắn (mỗi đoạn khoảng 150-200 từ) cho tác phẩm văn học Việt Nam sau:

Tên tác phẩm: ${title}
Tác giả: ${authorName}
Thể loại: ${genre || 'Văn học'}
Tóm tắt: ${contentSummary || 'Không có'}

YÊU CẦU:
1. Viết bằng tiếng Việt chuẩn, có dấu đầy đủ
2. Phong cách văn học Việt Nam truyền thống
3. Nội dung phải phù hợp với tên tác phẩm và tác giả
4. Mỗi đoạn là một phần độc lập, có thể đọc riêng
5. Sử dụng ngôn ngữ văn chương, hình ảnh thơ mộng
6. KHÔNG viết phân tích, chỉ viết nội dung văn học

Định dạng trả về:
---PHẦN 1---
[Nội dung đoạn 1]

---PHẦN 2---
[Nội dung đoạn 2]

...và tiếp tục cho đến PHẦN 5`;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            return this.parseChapters(text);
        } catch (error) {
            console.error(`❌ AI generation failed for "${title}":`, error.message);
            return this.getFallbackChapters(title, authorName);
        }
    }

    parseChapters(text) {
        const chapters = [];
        const parts = text.split(/---PHẦN \d+---/);
        
        for (let i = 1; i < parts.length && i <= 5; i++) {
            const content = parts[i].trim();
            if (content) {
                chapters.push({
                    title: `Phần ${i}`,
                    content: content,
                    image: this.getRandomImage(i)
                });
            }
        }

        return chapters.length > 0 ? chapters : this.getFallbackChapters('Tác phẩm', 'Tác giả');
    }

    getFallbackChapters(title, author) {
        const fallback = `Đây là nội dung mẫu cho tác phẩm "${title}" của ${author}.

Mùa xuân năm ấy, hoa phượng nở đỏ rực cả một góc trời. Những cánh hoa rơi lả tả trên sân trường, tạo nên một tấm thảm đỏ thắm. Tiếng ve kêu râm ran báo hiệu mùa hè sắp về.

Con đường làng quanh co uốn lượn theo triền đồi. Hai bên đường là những luống tre xanh mướt, lá tre xào xạc trong gió như tiếng thì thầm của thiên nhiên.`;

        return Array.from({ length: 5 }, (_, i) => ({
            title: `Phần ${i + 1}`,
            content: fallback,
            image: this.getRandomImage(i + 1)
        }));
    }

    getRandomImage(index) {
        const images = [
            'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070',
            'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2070',
            'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973',
            'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=2070',
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974'
        ];
        return images[(index - 1) % images.length];
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = AIContentGenerator;
