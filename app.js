$(document).ready(function () {
  let notes = [
    {
      judul: "Note1",
      isi: "Ini note 1",
    },
    {
      judul: "Note2",
      isi: "ini isi note 2",
    },
  ];

  renderNotes();

  function renderNotes() {
    $("#notes-list").empty();
    notes.forEach((note) => {
      $("#notes-list").append(`
        <li class="note-item">
            <div class="content-note">
              <h3 class="note-title">${note.judul}</h3>
              <p class="note-value">${note.isi}</p>
            </div>
            <div class="buttons-container">
              
              <div class="delete">
                <span><i class="fa-solid fa-delete-left"></i></span>
              </div>
            </div>
          </li>
        `);
    });
  }

  // Fungsi untuk menambah catatan
  $(".make-btn").on("click", function () {
    const judul = $("#input1").val();
    const isi = $("#input2").val();

    // Validasi isi dari note
    if (!judul || !isi) {
      alert("Judul dan isi catatan tidak boleh kosong");
      return;
    }

    // Menambahkan catatan baru ke Array
    notes.push({
      id: Date.now(),
      judul: judul,
      isi: isi,
    });

    // Mengkosongkan input setelah catatan dipush
    $("#input1").val("");
    $("#input2").val("");
    renderNotes();
  });

  // Hover Judul untuk mengubahnya menjadi input
  $("#notes-list").on("click", ".note-title", function () {
    const currentText = $(this).text();
    const inputEL = `<input type="text" class="title-input" value="${currentText}"/>`;
    $(this).replaceWith(inputEL);
    $(".title-input").focus();
  });
  // Hover Isi untuk mengubahnya menjadi textarea
  $("#notes-list").on("click", ".note-value", function () {
    const currentText = $(this).text();
    const textareaEl = `<textarea class="value-input">${currentText}</textarea>`;
    $(this).replaceWith(textareaEl);
    $(".value-input").focus();
  });

  // Menyimpan perubahan judul
  $("#notes-list").on("blur", ".title-input", function () {
    const updatedText = $(this).val();
    const h3El = `<h3 class="note-title">${updatedText}</h3>`;
    $(this).replaceWith(h3El);
  });
  $("#notes-list").on("blur", ".value-input", function () {
    const updatedText = $(this).val();
    const pEl = `<p class="note-value">${updatedText}</p>`;
    $(this).replaceWith(pEl);
  });

  // Delete
  $("#notes-list").on("click", ".delete", function () {
    const index = $(this).parent().data("index");
    notes.splice(index, 1);
    renderNotes();
  });
});
