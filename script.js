const API_KEY = "AIzaSyAAJiluH3e2MOyhdEHKH45YBMPL8966zpQ"; 
// URL này đã bỏ 'v1beta' để tránh lỗi không tìm thấy model
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

async function generateContent() {
    const name = document.getElementById('productName').value;
    const features = document.getElementById('features').value;
    const seo = document.getElementById('seoKeywords').value;

    if (!name || !features) {
        alert("Vui lòng nhập tên và tính năng!");
        return;
    }

    const loader = document.getElementById('loader');
    const resultArea = document.getElementById('resultArea');
    const aiResponse = document.getElementById('aiResponse');

    loader.classList.remove('hidden');
    resultArea.classList.add('hidden');

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Viết mô tả sản phẩm hấp dẫn cho: ${name}. Tính năng: ${features}. SEO: ${seo}` }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            aiResponse.innerText = data.candidates[0].content.parts[0].text;
            resultArea.classList.remove('hidden');
        } else {
            // Nếu vẫn lỗi, nó sẽ hiện lý do cụ thể ở đây
            alert("Lỗi từ Google: " + (data.error ? data.error.message : "AI bận, thử lại sau 10 giây"));
        }
    } catch (error) {
        alert("Lỗi mạng, hãy kiểm tra kết nối!");
    } finally {
        loader.classList.add('hidden');
    }
}

function copyContent() {
    const text = document.getElementById('aiResponse').innerText;
    navigator.clipboard.writeText(text).then(() => alert("Đã copy! ✅"));
}
