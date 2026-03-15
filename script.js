const API_KEY = "AIzaSyAAJiluH3e2MOyhdEHKH45YBMPL8966zpQ"; 
// ĐỊA CHỈ NÀY LÀ CHUẨN NHẤT CHO MODEL 1.5 FLASH:
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

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
                contents: [{ parts: [{ text: `Viết mô tả sản phẩm cho: ${name}. Đặc điểm: ${features}. SEO: ${seo}` }] }]
            })
        });

        const data = await response.json();
        
        // Kiểm tra cấu trúc phản hồi chuẩn của Gemini
        if (data.candidates && data.candidates[0].content) {
            aiResponse.innerText = data.candidates[0].content.parts[0].text;
            resultArea.classList.remove('hidden');
        } else {
            // Nếu có lỗi, hiện thông báo chi tiết từ Google
            alert("Lỗi hệ thống AI: " + (data.error ? data.error.message : "Hãy thử lại sau vài giây"));
        }
    } catch (error) {
        alert("Lỗi kết nối mạng, vui lòng kiểm tra lại!");
    } finally {
        loader.classList.add('hidden');
    }
}

function copyContent() {
    const text = document.getElementById('aiResponse').innerText;
    navigator.clipboard.writeText(text).then(() => alert("Đã sao chép! ✅"));
}
