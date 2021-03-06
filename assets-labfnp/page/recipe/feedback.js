$.fn.serializeObject = function () {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function () {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

$(document).ready(function () {

	$('input[name="feeling"]').tagEditor({
    autocomplete: {
        delay: 0, // show suggestions immediately
        position: { collision: 'flip' }, // automatic menu position up/down
        source: feelingData,
    },
		initialTags: initialTags,
    forceLowercase: false,
    placeholder: '請填寫您的感覺（可填寫多個）'
  });

	$('#orderForm').submit(function (event) {
		if ($('input[name="feeling"]').val() === '') {
			$('.error-text').addClass('show');
		} else {
			$('.error-text').removeClass('show');

			var ajaxConfig = {
				url: '/api/labfnp/recipe/feedback',
				method: 'POST',
				dataType: 'json',
				//contentType: 'application/json',
				cache: false,
				data: $('#orderForm').serializeObject()
			};
			var catchDone = function (result) {
				swal({
					title: '訊息',
					text: '完成回饋！',
					type: 'success',
					confirmButtonColor: "#2ecc71",
					confirmButtonText: "ＯＫ",
				}, function (isConform) {
					history.back();
				});
			};
			var catchFail = function (result) {
				swal('錯誤', '新增回饋資料發生錯誤，請稍候再試。', 'error');
			};
			$.ajax(ajaxConfig).done(catchDone).fail(catchFail);
		}
		return false;
	});
});
