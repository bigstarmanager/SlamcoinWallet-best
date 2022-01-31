$(document).ready(function() {
    $(document).on('click', ".chevron-sidebar", function() {
        // $('.setting-toast').toast('show');
        // alert('chevron clicked');
        $(".sidebar, .sidebar-collapsed").toggleClass("sidebar sidebar-collapsed");
        $(".main-content, .expanded").toggleClass("main-content expanded");
    });
});