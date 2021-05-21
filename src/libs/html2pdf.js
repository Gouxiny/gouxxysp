// 导出页面为PDF格式
import html2canvas from "html2canvas"

export default {
  install (Vue, options) {
    Vue.prototype.ExportSavePdf = function (htmlTitle, currentTime) {
      var element = document.getElementById("pdfCentent")
      html2canvas(element, {
        logging: false
      }).then(function (canvas) {
        var pdf = new jsPDF("p", "mm", "a4") // A4纸，纵向
        var ctx = canvas.getContext("2d")
        var a4w = 170; var a4h = 257 // A4大小，210mm x 297mm，四边各保留20mm的边距，显示区域170x257
        var imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
        var renderedHeight = 0
       /* pdf.addFont('NotoSansCJKtc-Regular.ttf', 'NotoSansCJKtc', 'normal');
        pdf.setFont('NotoSansCJKtc');
        pdf.text('您输入的300与正确值相差0~10%', 10, 10) //文本
        pdf.text('Hello world!', 10, 20)
        pdf.text('Hello world!', 10, 30)
          pdf.addPage(); */
        while (renderedHeight < canvas.height) {
          var page = document.createElement("canvas")
          page.width = canvas.width
          page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 可能内容不足一页
          
          // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page.getContext("2d").putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
          pdf.addImage(page.toDataURL("image/jpeg", 1.0), "JPEG", 20, 20, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距
         
          renderedHeight += imgHeight
          if (renderedHeight < canvas.height) { pdf.addPage() }// 如果后面还有内容，添加一个空页
          // delete page;
        }
        pdf.save(htmlTitle + currentTime)
      })
    }
  }
}