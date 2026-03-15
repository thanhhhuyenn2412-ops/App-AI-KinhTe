const API_KEY = "AIzaSyAAJiluH3e2MOyhdEHKH45YBMPL8966zpQ"; 
// ĐỊA CHỈ URL VÀ MODEL CHUẨN NHẤT HIỆN TẠI:
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function generateContent() {
    const name = document.getElementById('productName').value;
    const features = document.getElementById('features').value;
    const seo = document.getElementById('seoKeywords').value;

    if (!name || !features) {
        alert("Vui lòng nhập đủ Tên và Tính năng!");
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
                contents: [{ parts: [{ text: `Hãy viết mô tả bán hàng chuyên nghiệp cho sản phẩm: ${name}. Các tính năng chính: ${features}. Từ khóa SEO cần có: ${seo}. Yêu cầu: Viết theo phong cách thu hút, có gạch đầu dòng.` }] }]
            })
        });

        const data = await response.json();
        
        // Kiểm tra kết quả trả về
        if (data.candidates && data.candidates[0].content) {
            aiResponse.innerText = data.candidates[0].content.parts[0].text;
            resultArea.classList.remove('hidden'); // HIỆN KẾT QUẢ
        } else {
            alert("Lỗi: " + (data.error ? data.error.message : "AI đang bận, thử lại sau 5 giây"));
        }
    } catch (error) {
        alert("Lỗi kết nối mạng!");
    } finally {
        loader.classList.add('hidden'); // ẨN LOADER
    }
}

function copyContent() {
    const content = document.getElementById('aiResponse').innerText;
    navigator.clipboard.writeText(content).then(() => alert("Đã sao chép nội dung thành công! ✅"));
}
