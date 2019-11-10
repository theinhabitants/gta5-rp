$("#first_way, #second_way, #third_way").on("click", function () {
    const way = $(this).attr("way");
    //alert(way);
    mp.trigger("enterWayInClient", way);
});