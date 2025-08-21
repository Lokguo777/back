/**
 * 主管專區導航狀態管理
 */
$(document).ready(function() {
    // 獲取主管專區菜單項
    const $managerArea = $('#manager-area-nav');
    
    // 從 localStorage 讀取狀態
    const isExpanded = localStorage.getItem('managerAreaExpanded') === 'true';
    
    // 如果之前是展開狀態，則展開菜單
    if (isExpanded) {
        $managerArea.addClass('open')
            .find('a:first')
            .attr('aria-expanded', true)
            .find('b:first')
            .html('[-]');
        
        $managerArea.find('ul:first').show();
    }
    
    // 監聽菜單點擊事件
    $managerArea.find('a:first').on('mousedown', function() {
        // 延遲執行，等待原始導航邏輯完成
        setTimeout(() => {
            // 保存當前狀態
            const isOpen = $managerArea.hasClass('open');
            localStorage.setItem('managerAreaExpanded', isOpen);
        }, 500);
    });
}); 