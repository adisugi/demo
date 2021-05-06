var tableBiodata = {
  create: function () {
    // jika table tersebut datatable, maka clear and dostroy
    if ($.fn.DataTable.isDataTable('#tableBiodata')) {
      //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
      $('#tableBiodata').DataTable().clear();
      $('#tableBiodata').DataTable().destroy();
    }

    $.ajax({
      url: '/api/biodata',
      method: 'get',
      contentType: 'application/json',
      success: function (res, status, xhr) {
        if (xhr.status == 200 || xhr.status == 201) {
          $('#tableBiodata').DataTable({
            data: res,
            columns: [
              {
                title: "Nama",
                data: "nama"
              },
              {
                title: "No. Telp",
                data: "telp"
              },
              {
                title: "Email",
                data: "email"
              },
              {
                title: "Action",
                data: null,
                render: function (data, type, row) {
                  return "<button class='btn-success' data-toggle='tooltip' title='edit' data-placement='bottom' onclick=formBiodata.setEditData('" + data.id + "') style='border-radius: 20%'><i class='fa fa-pencil-alt'></i></button>" + "<span>   </span>" +
                    "<button class='btn-danger' data-toggle='tooltip' title='delete' data-placement='bottom' onclick=actionDelete.deleteConfirm('" + data.id + "') style='border-radius: 20%'><i class='fa fa-trash'></i></button>"
                }
              }
            ],
            scrollX : true
          });

        } else {

        }
      },
      error: function (err) {
        console.log(err);
      }
    });


  }
};

var formBiodata = {
  resetForm: function () {
    $('#form-biodata')[0].reset();
    $('#id').val("");
    $('#idDetail').val("");
  },
  saveForm: function () {
    if ($('#form-biodata').parsley().validate()) {
      var dataResult = getJsonForm($("#form-biodata").serializeArray(), true);
      $.ajax({
        url: '/api/biodata',
        method: 'post',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(dataResult),
        success: function (res, status, xhr) {
          if (xhr.status == 200 || xhr.status == 201) {
            tableBiodata.create();
            $('#modal-biodata').modal('hide')

          } else {

          }
        },
        erorrr: function (err) {
          console.log(err);
        }
      });
    }

  },
  setEditData: function (idCabang) {
    formBiodata.resetForm();

    $.ajax({
      url: '/api/biodata/' + idCabang,
      method: 'get',
      contentType: 'application/json',
      dataType: 'json',
      success: function (res, status, xhr) {
        if (xhr.status == 200 || xhr.status == 201) {
          $('#form-biodata').fromJSON(JSON.stringify(res));
          $('#modal-biodata').modal('show')

        } else {

        }
      },
      erorrr: function (err) {
        console.log(err);
      }
    });
  }
};

var actionDelete = {
  deleteConfirm: function (idCabang) {
    $.ajax({
      url: '/api/biodata/' + idCabang,
      method: 'get',
      contentType: 'application/json',
      dataType: 'json',
      success: function (res, status, xhr) {
        if (xhr.status == 200 || xhr.status == 201) {
          $('#form-biodata').fromJSON(JSON.stringify(res));
          $('#modal-delete').modal('show')
        } else {

        }
      },
      erorrr: function (err) {
        console.log(err);
      }
    });
  },

  deleteRowData : function () {
    if ($('#form-biodata').parsley().validate()) {
      var dataResult = getJsonForm($("#form-biodata").serializeArray(), true);

      $.ajax({
        url: '/api/biodata/' + dataResult.id,
        method: 'delete',
        success: function () {
          tableBiodata.create();
          $('#modal-delete').modal('hide');
        },
        erorrr: function (err) {
          console.log(err);
        }
      });
    }
  }
};
