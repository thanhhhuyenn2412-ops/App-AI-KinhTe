const API_KEY = "AIzaSyAAJiluH3e2MOyhdEHKH45YBMPL8966zpQ"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function generateContent() {
    const name = document.getElementById('productName').value;
    const features = document.getElementById('features').value;
    const seo = document.getElementById('seoKeywords').value;

    if (!name || !features) {
        alert("Vui lòng nhập tên và tính năng sản phẩm!");
        return;
    }

    const loader = document.getElementById('loader');
    const resultArea = document.getElementById('resultArea');
    const aiResponse = document.getElementById('aiResponse');

    // Hiển thị loader và ẩn vùng kết quả cũ
    loader.classList.remove('hidden');
    resultArea.classList.add('hidden');

    const prompt = `Bạn là chuyên gia marketing. Hãy viết mô tả sản phẩm cho: ${name}. Tính năng: ${features}. SEO: ${seo}. Yêu cầu: Viết hấp dẫn, có gạch đầu dòng và lời kêu gọi mua hàng.`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const text = data.candidates[0].content.parts[0].text;
            aiResponse.innerText = text;
            // HIỆN VÙNG KẾT QUẢ
            resultArea.classList.remove('hidden');
        } else {
            throw new Error("AI không trả về kết quả.");
        }

    } catch (error) {
        console.error(error);
        alert("Lỗi rồi: " + error.message);
    } finally {
        // ẨN LOADER
        loader.classList.add('hidden');
    }
}

function copyContent() {
    const content = document.getElementById('aiResponse').innerText;
    navigator.clipboard.writeText(content);
    alert("Đã sao chép nội dung thành công! ✅");
}
