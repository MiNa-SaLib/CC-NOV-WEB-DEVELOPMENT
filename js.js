let newImg, show;
let fr, pdf;
let btn = document.getElementById("button");
let load = document.getElementById("load");

//===========================================
load.addEventListener("change", function (event) {
  if (
    load.files[0].type == "image/jpeg" ||
    load.files[0].type == "image/png" ||
    load.files[0].type == "image/avif" ||
    load.files[0].type == "image/webp"
  ) {
    show = document.getElementById("show");
    show.src = URL.createObjectURL(event.target.files[0]);
    newImg = document.createElement("img");
    newImg.src = URL.createObjectURL(event.target.files[0]);
    show.onload = function () {
      URL.revokeObjectURL(show.scr);
    };
  } else {
    fr = new FileReader();
    fr.readAsText(load.files[0]);
  }
});

//=================================

btn.addEventListener("click", function () {
  if (load.files[0].type == "text/plain") {
    pdf = new jsPDF("p", "pt", "letter");
    pdf.canvas.height = 72 * 11;
    pdf.canvas.width = 72 * 8.5;

    pdf.fromHTML(fr.result);

    pdf.save("test.pdf");
  } else {
    console.log(newImg);
    let doc = new jsPDF();

    doc.addImage(newImg, 5, 5);
    doc.save("test.pdf");
  }
});
