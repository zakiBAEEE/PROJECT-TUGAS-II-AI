class Aturan {
  constructor() {
    this.aturan = [
      { gejala: ["3", "16"], penyakit: 1 },
      { gejala: ["3", "19"], penyakit: 2 },
      { gejala: ["1", "2", "7", "14", "16", "22"], penyakit: 3 },
      { gejala: ["2", "6"], penyakit: 4 },
      { gejala: ["1", "5", "6", "15", "25", "29"], penyakit: 5 },
      { gejala: ["1", "3", "7", "13", "14"], penyakit: 6 },
      { gejala: ["3", "4", "7", "13", "16", "23", "24"], penyakit: 7 },
      { gejala: ["3", "12", "15", "21", "30", "31"], penyakit: 8 },
      { gejala: ["12"], penyakit: 9 },
      { gejala: ["5", "15"], penyakit: 10 },
      { gejala: ["7", "12"], penyakit: 11 },
      { gejala: ["1", "3", "1", "4", "19", "37"], penyakit: 12 },
      { gejala: ["10", "17"], penyakit: 13 },
      { gejala: ["20", "35"], penyakit: 14 },
      { gejala: ["1", "6", "10", "32"], penyakit: 15 },
      { gejala: ["6", "10", "34", "36"], penyakit: 16 },
      { gejala: ["1", "2", "3", "4", "7", "10"], penyakit: 17 },
      { gejala: ["2", "20", "38"], penyakit: 18 },
      { gejala: ["17"], penyakit: 19 },
      {
        gejala: ["1", "2", "4", "5", "8", "9", "11", "28", "33"],
        penyakit: 20,
      },
      { gejala: ["1", "2", "4", "5", "8", "9", "11", "18"], penyakit: 21 },
      {
        gejala: ["1", "2", "4", "5", "8", "9", "11", "18", "26", "27"],
        penyakit: 22,
      },
      { gejala: ["1", "2", "4", "5", "6", "8", "9", "11", "12"], penyakit: 23 },
      { gejala: ["1", "2", "3", "4"], penyakit: 24 },
    ];
  }
}

class Penyakit {
  constructor() {
    this.penyakitList = [
      { id: 1, nama: "Contract Ulcers" },
      { id: 2, nama: "Abaes Parafaringeal" },
      { id: 3, nama: "ABAES PERITONAILER" },
      { id: 4, nama: "BAROTITIS MEDIA " },
      { id: 5, nama: "DEVIASI SEPTUM" },
      { id: 6, nama: "Faringitis" },
      { id: 7, nama: "Kanker Laring" },
      { id: 8, nama: "KANKER LEHER DAN KEPALA" },
      { id: 9, nama: "KANKER LEHER METASTATIK" },
      { id: 10, nama: "KANKER NASOFARING" },
      { id: 11, nama: "KANKER TONSIL" },
      { id: 12, nama: "LARINGITIS" },
      { id: 13, nama: "NEURONITIS VESTIBULARIS" },
      { id: 14, nama: "OSTEOSKLEROSIS" },
      { id: 15, nama: "OTITIS MEDIA AKUT" },
      { id: 16, nama: "MENIERE" },
      { id: 17, nama: "TONSILITIS" },
      { id: 18, nama: "TUMOR SYARAF PENDENGARAN" },
      { id: 19, nama: "VERTIGO POSTULAR" },
      { id: 20, nama: "SINUSITIS MAKSILARIS" },
      { id: 21, nama: "SINUSITIS FRONTALIS" },
      { id: 22, nama: "SINUSITIS ETMOIDALIS" },
      { id: 23, nama: "SINUSITIS SFENOIDALIS" },
      { id: 24, nama: "PERUT" },
    ];
  }
}

var diagnosis = document.createElement("h2");

var aturanPenyakit = new Aturan();
var penyakit = new Penyakit();

// function diagnose(selectedSymptoms) {
//   for (let rule of aturanPenyakit.aturan) {
//     if (
//       rule.gejala.every((symptomId) => selectedSymptoms.includes(symptomId))
//     ) {
//       return penyakit.penyakitList.find(
//         (penyakit) => penyakit.id === rule.penyakit
//       ).nama;
//     }
//   }
//   return "Diagnosis tidak tersedia";
// }

function diagnose(selectedSymptoms) {
  for (let rule of aturanPenyakit.aturan) {
    if (
      rule.gejala.every((symptomId) => selectedSymptoms.includes(symptomId))
    ) {
      return (
        "Anda Menderita Penyakit " +
        penyakit.penyakitList.find((penyakit) => penyakit.id === rule.penyakit)
          .nama
      );
    }
  }

  // Mencari aturan yang paling mendekati
  let closestMatch = "";
  let maxMatchCount = 0;
  for (let rule of aturanPenyakit.aturan) {
    let matchCount = rule.gejala.filter((symptomId) =>
      selectedSymptoms.includes(symptomId)
    ).length;
    let matchPercentage = (matchCount / rule.gejala.length) * 100; // Menghitung persentase kecocokan
    if (matchPercentage >= 70 && matchCount > maxMatchCount) {
      // Memeriksa kecocokan minimal 70%
      maxMatchCount = matchCount;
      closestMatch = penyakit.penyakitList.find(
        (penyakit) => penyakit.id === rule.penyakit
      ).nama;
    }
  }

  // Jika ada aturan yang mendekati dengan kecocokan minimal 70%
  if (maxMatchCount > 0) {
    return "Kemungkinan Besar Anda Menderita Penyakit " + closestMatch;
  } else {
    return "Diagnosis tidak tersedia";
  }
}

submitButton.addEventListener("click", function () {
  var selectedValues = [];
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedValues.push(checkbox.value);
      checkbox.checked = false;
    }
  });

  var diagnosisResult = diagnose(selectedValues);
  diagnosis.innerText = "";
  diagnosis.innerText = "Hasil diagnosis: " + diagnosisResult;
  document.getElementById("daftar").appendChild(diagnosis);
});
