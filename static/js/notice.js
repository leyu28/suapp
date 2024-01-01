//打开公告详情
$('#notice_con').click(function() {
    showPop('notice_detail');
})
//关闭公告详情
$('#detail_close').click(function() {
    hidePop('notice_detail');
})

//打开公告列表
$('#more_notice').click(function() {
    showPop('notice_list');
})
//关闭公告列表
$('#list_close').click(function() {
    hidePop('notice_list');
})
//公告列表中点击查看单个公告详情
$('#notice_list .notice-item .notice-title').click(function() {
    // hidePop('notice_list');
    $.ajax({
        type: "POST",
        url: "desktop/findById",
        data: {
            titleId: $(this).attr('v-data')
        },
        dataType: "json",
        success: function(data) {
            $(".popbox").empty();
            let html = '';
            html += '<div class="pop-title popTitle">';
            html += '<B>' + data.title + '</B>';
            html += '<br/>';
            html += '<span class="bottom-time">' + data.createTime + '</span>';
            html += '</div>';
            html += '<div class="popTimecontent">';
            html += '<div class="popTimeinerr">';
            html += '<div class="pop-con pop-con-detail">' + data.content + '</div>';
            html += '</div>';
            html += '</div>';
            $(".popbox").append(html);
        }
    })
    showPop('notice_detail');
})

function showPop(_id) {
    $('#' + _id).removeClass('hidden');
}

function hidePop(_id) {
    $('#' + _id).addClass('hidden');
}

let loaddMark = false;
$(".pop-con").scroll(function() {
    let mainheight = document.querySelector('.notice-list').offsetHeight;
    let outerHeight = document.querySelector('.pop-con').offsetHeight;
    let scrollElle = document.querySelector('.pop-con');
    if (mainheight - outerHeight - scrollElle.scrollTop < 50) {
        if (!loaddMark) {
            loaddMark = true;
            $.ajax({
                type: "POST",
                url: "desktop/nextPage",
                data: {
                    page: $("#page").val()
                },
                dataType: "json",
                success: function(data) {
                    if (data.length == 0) {
                        $.alert('我也是有底线的呀');
                    } else {
                        let html = '';
                        $.each(data, function(k, v) {
                            html += '<div class="notice-item">';
                            html += '<div class="notice-title" v-data=' + v.id + '>' + v.title + '<br/>';
                            html += '<div class="notice-time">' + v.create_time + "</div>";
                            html += '</div>';
                            html += '</div>';
                        });
                        $('.notice-list').append(html);
                        dd();
                    }
                }
            })
        }
    }
})

function dd() {
    $('#notice_list .notice-item .notice-title').click(function(m) {
        m = this;
        //  hidePop('notice_list');
        $.ajax({
            type: "POST",
            url: "desktop/findById",
            data: {
                titleId: $(m).attr('v-data')
            },
            dataType: "json",
            success: function(data) {
                $('.popbox').empty();
                let html = '';
                html += '<div class="pop-title popTitle">';
                html += '<B>' + data.title + '</B>';
                html += '<br/>';
                html += '<span class="bottom-time">' + data.createTime + '</span>';
                html += '</div>';
                html += '<div class="popTimecontent">';
                html += '<div class="popTimeinerr">';
                html += '<div class="pop-con pop-con-detail">' + data.content + '</div>';
                html += '</div>';
                html += '</div>';
                $(".popbox").append(html);
            }
        })
        showPop('notice_detail');
    })
}