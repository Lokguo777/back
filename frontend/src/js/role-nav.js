/**
 * 角色導航管理
 * 根據用戶登錄的角色顯示/隱藏相應的導航選項
 */
$(document).ready(function() {
    // 從localStorage獲取用戶角色
    const userRole = localStorage.getItem('userRole');
    console.log('當前用戶角色:', userRole);
    
    // 設置根元素的角色屬性
    const navMenu = document.getElementById('js-nav-menu');
    if (navMenu) {
        navMenu.setAttribute('data-current-role', userRole || 'none');
    }
    
    // 恢復主管專區的展開狀態（僅當用戶是主管時）
    if (userRole === 'manager') {
        const managerArea = $('.role-nav-item[data-role="manager"]');
        const savedState = JSON.parse(localStorage.getItem('navState') || '{}');
        
        // 恢復所有保存的展開狀態
        Object.keys(savedState).forEach(id => {
            const $item = $(`#${id}`);
            if ($item.length && savedState[id]) {
                $item.addClass('open')
                    .find('a:first')
                    .attr('aria-expanded', true)
                    .find('b:first')
                    .html('[-]');
                
                $item.find('ul:first').show();
            }
        });
        
        // 監聽所有可展開項目的點擊事件
        managerArea.find('a:first').on('mousedown', function() {
            const $parentLi = $(this).closest('li');
            const itemId = $parentLi.attr('id');
            
            // 延遲執行，等待原始導航邏輯完成
            setTimeout(() => {
                const navState = JSON.parse(localStorage.getItem('navState') || '{}');
                navState[itemId] = $parentLi.hasClass('open');
                localStorage.setItem('navState', JSON.stringify(navState));
            }, 500);
        });
    }
    
    // 防止未授權訪問
    $(document).on('click', 'a', function(e) {
        const $link = $(this);
        const href = $link.attr('href');
        
        // 檢查是否是受限制的頁面
        if (href && href.includes('_dashboard') || href.includes('manager_')) {
            const requiredRole = href.includes('boss_') ? 'boss' : 
                               href.includes('manager_') ? 'manager' : 
                               href.includes('staff_') ? 'staff' : null;
            
            if (requiredRole && userRole !== requiredRole) {
                e.preventDefault();
                alert('您沒有權限訪問此頁面');
                return false;
            }
        }
    });
}); 