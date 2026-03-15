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

    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('resultArea').classList.add('hidden');

    const prompt = `Bạn là chuyên gia marketing. Hãy viết mô tả sản phẩm cho: ${name}. Tính năng: ${features}. SEO: ${seo}. Yêu cầu: Viết hấp dẫn, có gạch đầu dòng.`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        document.getElementById('aiResponse').innerText = data.candidates[0].content.parts[0].text;
        document.getElementById('resultArea').classList.remove('hidden');
    } catch (error) {
        alert("Lỗi: " + error.message); [cite: 52]
    } finally {
        document.getElementById('loader').classList.add('hidden');
    }
}

function copyContent() {
    const content = document.getElementById('aiResponse').innerText;
    navigator.clipboard.writeText(content);
    alert("Đã sao chép! ✅"); [cite: 50]
}
