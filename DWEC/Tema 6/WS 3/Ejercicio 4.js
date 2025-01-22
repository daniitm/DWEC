$(document).ready(function () {
    // Otorgar foco al cuadro de texto
    $("#focusButton").click(function () {
        $("#textBox").focus();
    });

    // Quitar el foco del cuadro de texto
    $("#blurButton").click(function () {
        $("#textBox").blur();
    });
});