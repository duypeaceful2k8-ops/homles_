const questions = [
    {
        query: "Điều kiện cần về cấu tạo của monomer để tham gia phản ứng trùng hợp là gì?",
        options: ["A. Phải có hai nhóm chức trở lên.", "B. Phải có liên kết đơn vòng bền vững.", "C. Phải có liên kết bội (C=C, C≡C...) hoặc vòng kém bền dễ mở.", "D. Phải là hợp chất hydrocacbon no."],
        correctAnswer: 2, formula: "Target Chain: [—CH₂—CH₂—]ₙ (Nhựa PE nguyên sinh)",
        explanation: "Monomer cần chứa liên kết pi kém bền mở ra để nối mạch, hoặc vòng chứa sức căng lớn dễ đứt vòng."
    },
    {
        query: "Chất nào sau đây KHÔNG có khả năng tham gia phản ứng trùng hợp?",
        options: ["A. Ethylene (CH2=CH2).", "B. Ethane (CH3-CH3).", "C. Styrene (C6H5-CH=CH2).", "D. Vinyl chloride (CH2=CH-Cl)."],
        correctAnswer: 1, formula: "Target Chain: [—CH₂—CHCl—]ₙ (Nhựa bền PVC cách điện)",
        explanation: "Ethane (CH3-CH3) chỉ có liên kết đơn C-C và C-H bền vững, không có tâm phản ứng để mở mạch."
    },
    {
        query: "Phản ứng trùng hợp khác phản ứng trùng ngưng ở đặc điểm cốt lõi nào?",
        options: ["A. Trùng hợp tạo ra sản phẩm có phân tử khối rất lớn.", "B. Trùng hợp cần chất xúc tác kim loại quý.", "C. Trùng hợp không giải phóng các phân tử nhỏ, còn trùng ngưng giải phóng phân tử nhỏ (H2O, HCl...).", "D. Trùng hợp chỉ xảy ra với hợp chất vô cơ."],
        correctAnswer: 2, formula: "Target Chain: Monomer 1 + Monomer 2 ──(H₂O)──> Polymer",
        explanation: "Trùng hợp giữ nguyên toàn bộ khối lượng các nguyên tử từ monomer vào mạch polime mà không sinh ra phụ phẩm phân tử nhỏ."
    },
    {
        query: "Ba giai đoạn diễn ra theo thứ tự trong cơ chế gốc của phản ứng trùng hợp là gì?",
        options: ["A. Phát triển mạch -> Khơi mào -> Ngắt mạch.", "B. Khơi mào -> Phát triển mạch -> Ngắt mạch.", "C. Khơi mào -> Ngắt mạch -> Phát triển mạch.", "D. Hoạt hóa phân tử -> Phân cắt -> Dừng mạch."],
        correctAnswer: 1, formula: "Target Mechanism: R• + Monomer ──> R—Mon• (Gốc tự do)",
        explanation: "Cơ chế chuỗi gốc luôn đi qua 3 bước tuần tự: Khơi mào sinh ra gốc tự do R• -> Phát triển mạch dài ra -> Ngắt mạch triệt tiêu gốc tự do."
    },
    {
        query: "Hợp chất chất dẻo/tơ nào dưới đây được điều chế bằng phản ứng trùng ngưng?",
        options: ["A. Chất dẻo Polyethylene (PE).", "B. Nhựa Poly(vinyl chloride) (PVC).", "C. Tơ bền Nylon-6,6.", "D. Cao su tổng hợp Buna."],
        correctAnswer: 2, formula: "Target Chain: [—NH—(CH₂)₆—NH—CO—(CH₂)₄—CO—]ₙ (Tơ Nylon-6,6)",
        explanation: "Tơ Nylon-6,6 tổng hợp từ hexamethylenediamine và adipic acid qua các nhóm chức tương tác peptide, đồng thời giải phóng các phân tử H2O."
    }
];

let currentIdx = 0; let score = 0; let timeLeft = 30; let timerInterval; let userAnswers = [];
const txtQuestion = document.getElementById("question-txt");
const panelOptions = document.getElementById("options-panel");
const barProgress = document.getElementById("progress-bar");
const txtFormula = document.getElementById("formula-decoration");
const txtTimer = document.getElementById("timer");
const btnNext = document.getElementById("btn-next");

function initQuiz() { renderQuestion(); }
function renderQuestion() {
    clearInterval(timerInterval); timeLeft = 30;
    txtTimer.textContent = "⏱️ PHẢN ỨNG: " + timeLeft + "s"; txtTimer.style.color = "#f1c40f";
    const q = questions[currentIdx]; txtFormula.textContent = q.formula;
    txtQuestion.innerHTML = "<span style='color:var(--chem-green)'>🧪 Mẫu Thử " + (currentIdx + 1) + "/" + questions.length + ":</span> " + q.query;
    panelOptions.innerHTML = "";
    q.options.forEach((opt, index) => {
        panelOptions.innerHTML += "<li class='option-item'><input type='radio' id='opt-" + index + "' name='chem-opt' value='" + index + "'><label for='opt-" + index + "'>" + opt + "</label></li>";
    });
    const progressPercent = (currentIdx / questions.length) * 100;
    barProgress.style.width = progressPercent + "%";
    if (currentIdx === questions.length - 1) {
        btnNext.textContent = "⚗️ Tổng Hợp Sản Phẩm (Nộp Bài)"; btnNext.style.backgroundColor = "var(--warning-red)";
    } else {
        btnNext.textContent = "🧪 Bơm Xúc Tác (Câu Tiếp)"; btnNext.style.backgroundColor = "var(--beaker-blue)";
    }
    timerInterval = setInterval(() => {
        timeLeft--; txtTimer.textContent = "⏱️ PHẢN ỨNG: " + timeLeft + "s";
        if (timeLeft <= 10) { txtTimer.style.color = "var(--warning-red)"; }
        if (timeLeft <= 0) { nextQuestion(); }
    }, 1000);
}
function nextQuestion() {
    clearInterval(timerInterval);
    const selectedOpt = document.querySelector('input[name="chem-opt"]:checked');
    let answerVal = -1;
    if (selectedOpt) { answerVal = parseInt(selectedOpt.value); }
    userAnswers.push(answerVal);
    if (answerVal === questions[currentIdx].correctAnswer) { score++; }
    currentIdx++;
    if (currentIdx < questions.length) { renderQuestion(); } else { showReport(); }
}
function showReport() {
    const container = document.getElementById("quiz-container");
    const purity = (score / questions.length) * 100;
    txtTimer.textContent = "📊 PHÂN TÍCH XONG"; txtTimer.style.color = "var(--neon-green)";
    let htmlReport = "<div class='report-header'><h2>📊 PHIẾU PHÂN TÍCH ĐỊNH LƯỢNG MẪU THỬ</h2><div class='purity-score' style='color: " + (purity >= 60 ? 'var(--neon-green)' : 'orange') + "'>Độ tinh khiết lý thuyết đạt: " + purity.toFixed(1) + "% (" + score + "/" + questions.length + " Chuỗi Hoàn Hảo)</div></div><div class='result-box'>";
    questions.forEach((q, i) => {
        const uAns = userAnswers[i]; const isCorrect = (uAns === q.correctAnswer);
        const statusClass = isCorrect ? "correct" : "incorrect";
        const statusLabel = isCorrect ? "🔬 ĐÁNH GIÁ MẪU: ĐẠT CHUẨN" : "🔬 ĐÁNH GIÁ MẪU: TẠP CHẤT";
        htmlReport += "<div class='report-item " + statusClass + "'><div class='report-status'>" + statusLabel + "</div><p><strong>Đề bài:</strong> " + q.query + "</p><p style='color: " + (isCorrect ? 'var(--chem-green)' : 'var(--warning-red)') + "'>• Kết quả đo phổ của học sinh: " + (uAns === -1 ? 'Mẫu trống (Hết giờ)' : q.options[uAns]) + "</p><p style='color: var(--chem-green)'>• Cấu trúc chuẩn của Lab: " + q.options[q.correctAnswer] + "</p><div class='explain-txt'>💡 Giải trình phản ứng: " + q.explanation + "</div></div>";
    });
    htmlReport += "</div>"; container.innerHTML = htmlReport; btnNext.style.display = "none";
}
window.onload = initQuiz;
