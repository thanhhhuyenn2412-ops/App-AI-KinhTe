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

    loader.classList.remove('hidden');
    resultArea.classList.add('hidden');

    const promptText = `Bạn là chuyên gia marketing. Hãy viết mô tả sản phẩm hấp dẫn cho: ${name}. Tính năng: ${features}. SEO: ${seo}.`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: promptText }]
                }]
            })
        });

        const data = await response.json();
        
        // Kiểm tra xem AI có trả về lỗi an toàn hoặc giới hạn không
        if (data.candidates && data.candidates[0].content) {
            aiResponse.innerText = data.candidates[0].content.parts[0].text;
            resultArea.classList.remove('hidden');
        } else if (data.error) {
            alert("Lỗi API: " + data.error.message);
        } else {
            alert("AI từ chối trả lời hoặc hết hạn ngạch (Quota). Hãy thử lại sau 1 phút.");
        }

    } catch (error) {
        alert("Lỗi kết nối mạng: " + error.message);
    } finally {
        loader.classList.add('hidden');
    }
}

function copyContent() {
    const content = document.getElementById('aiResponse').innerText;
    navigator.clipboard.writeText(content).then(() => {
        alert("Đã sao chép nội dung! ✅");
    });
}
