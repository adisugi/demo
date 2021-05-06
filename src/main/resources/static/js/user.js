var tableUser = {
    create: function () {
        // jika table tersebut datatable, maka clear and dostroy
        if ($.fn.DataTable.isDataTable('#tableUser')) {
            //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
            $('#tableUser').DataTable().clear();
            $('#tableUser').DataTable().destroy();
        }

        $.ajax({
            url: '/api/user',
            method: 'get',
            contentType: 'application/json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#tableUser').DataTable({
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
                                    return "<button class='btn-success' data-toggle='tooltip' title='edit' data-placement='bottom' onclick=formUser.setEditData('" + data.idUser + "') style='border-radius: 20%'><i class='fa fa-pencil-alt'></i></button>" + "<span>   </span>" +
                                           "<button class='btn-danger' data-toggle='tooltip' title='delete' data-placement='bottom' onclick=actionDelete.deleteConfirm('" + data.idUser + "') style='border-radius: 20%'><i class='fa fa-minus-circle'></i></button>"
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

var formUser = {
    resetForm: function () {
        $('#form-user')[0].reset();
        $('#id').val("");
    },
    saveForm: function () {
        if ($('#form-user').parsley().validate()) {
            var dataResult = getJsonForm($("#form-user").serializeArray(), true);
            $.ajax({
                url: '/api/user',
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(dataResult),
                success: function (res, status, xhr) {
                    if (xhr.status == 200 || xhr.status == 201) {
                        tableUser.create();
                        $('#modal-user').modal('hide')

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
        formUser.resetForm();

        $.ajax({
            url: '/api/user/' + idCabang,
            method: 'get',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res, status, xhr) {
                if (xhr.status == 200 || xhr.status == 201) {
                    $('#form-user').fromJSON(JSON.stringify(res));
                    $('#modal-user').modal('show')

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
    deleteConfirm: function (id) {
      $.ajax({
        url: '/api/user/' + id,
        method: 'get',
        contentType: 'application/json',
        dataType: 'json',
        success: function (res, status, xhr) {
          if (xhr.status == 200 || xhr.status == 201) {
            $('#form-user').fromJSON(JSON.stringify(res));
            var h4 =  '<h4>Yakin ingin menghapus data ini?</h4>'
            var p = '<p>Data ini akan hilang setelah mengklik tombol "Delete"</p>';
            $('#modal-header').html(h4)
            $('#modal-hidden-id').html(p);
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
      if ($('#form-user').parsley().validate()) {
        var dataResult = getJsonForm($("#form-user").serializeArray(), true);

        $.ajax({
          url: '/api/user/' + dataResult.idUser,
          method: 'delete',
          success: function () {
              tableUser.create();
              $('#modal-delete').modal('hide');
          },
          erorrr: function (err) {
            console.log(err);
          }
        });
      }
    },

    deleteTable : function () {
      $.ajax({
        url: '/api/user',
        method: 'delete',
        success: function () {
          tableUser.create()
          $('#modal-delete').modal('hide')
        }

      })
    }


};
