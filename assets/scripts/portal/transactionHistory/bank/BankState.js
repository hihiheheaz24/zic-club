/**
 * Created by Nofear on 6/8/2017.
 */
(function() {
    cc.BankState = cc.Enum({
        FAILED2: '-2', //Thất bại
        FAILED: '-1', //Thất bại
        FAILED1: '3', //Thất bại
        PENDING: '10', //Chờ xử lý
        SUCCESS: '1', //Thành công
        PENDING_BANK: '4', //Chờ duyệt từ ngân hàng
        ADMIN_CANCEL: '-5', //Admin huỷ giao dịch
        PENDING_API: '-4', //Admin huỷ giao dịch
        BANK_CANCEL: '5', //Ngân hàng từ chối giao dịch
        //Còn lại là thất bại
    });

}).call(this);