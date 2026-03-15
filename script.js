const API_KEY = "AIzaSyAAJiluH3e2MOyhdEHKH45YBMPL8966zpQ";

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function generateContent() {

    const name = document.getElementById("productName").value.trim();
    const features = document.getElementById("features").value.trim();
    const seo = document.getElementById("seoKeywords").value.trim();

    if (!name || !features) {
        alert("Vui lòng nhập Tên sản phẩm và Tính năng!");
        return;
    }

    const loader = document.getElementById("loader");
    const resultArea = document.getElementById("resultArea");
    const aiResponse = document.getElementById("aiResponse");

    loader.classList.remove("hidden");
    resultArea.classList.add("hidden");

    const prompt = `
Viết mô tả bán hàng chuyên nghiệp cho sản phẩm:

Tên sản phẩm: ${name}

Tính năng:
${features}

Từ khóa SEO:
${seo}

Yêu cầu:
- Viết hấp dẫn
- Có đoạn giới thiệu
- Có gạch đầu dòng lợi ích
- Có lời kêu gọi mua hàng cuối bài
`;

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error("API lỗi: " + response.status);
        }

        const data = await response.json();

        if (
            data.candidates &&
            data.candidates.length > 0 &&
            data.candidates[0].content &&
            data.candidates[0].content.parts
        ) {

            const text = data.candidates[0].content.parts[0].text;

            aiResponse.innerText = text;

            resultArea.classList.remove("hidden");

        } else {

            console.log(data);
            alert("AI chưa trả kết quả. Hãy thử lại!");

        }

    } catch (error) {

        console.error(error);
        alert("Lỗi kết nối API hoặc mạng!");

    } finally {

        loader.classList.add("hidden");

    }

}

function copyContent() {

    const content = document.getElementById("aiResponse").innerText;

    if (!content) {
        alert("Chưa có nội dung để copy!");
        return;
    }

    navigator.clipboard.writeText(content)
        .then(() => {
            alert("Đã sao chép nội dung thành công ✅");
        });

}
