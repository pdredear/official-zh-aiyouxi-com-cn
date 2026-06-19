// public/site-helper.js
// 页面提示卡片、关键词徽章和访问说明

(function() {
  'use strict';

  // 站点配置数据
  const siteConfig = {
    siteUrl: 'https://official-zh-aiyouxi.com.cn',
    keywords: ['爱游戏', '休闲', '娱乐', '体验'],
    version: '1.2.0'
  };

  // 创建提示卡片
  function createTipCard() {
    const card = document.createElement('div');
    card.className = 'site-tip-card';
    card.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #f0f4ff;
      border: 1px solid #b0c4de;
      border-radius: 12px;
      padding: 16px 20px;
      max-width: 280px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      z-index: 9999;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #2c3e50;
      transition: opacity 0.3s ease;
    `;

    const title = document.createElement('h4');
    title.textContent = '💡 提示';
    title.style.margin = '0 0 8px 0';
    title.style.fontSize = '16px';
    title.style.fontWeight = '600';

    const desc = document.createElement('p');
    desc.textContent = `欢迎访问 ${siteConfig.siteUrl}，探索更多「爱游戏」相关内容。`;
    desc.style.margin = '0 0 6px 0';
    desc.style.fontSize = '13px';
    desc.style.lineHeight = '1.5';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 6px;
      right: 10px;
      background: transparent;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #7f8c8d;
      line-height: 1;
    `;
    closeBtn.addEventListener('click', function() {
      card.style.opacity = '0';
      setTimeout(() => { if (card.parentNode) card.parentNode.removeChild(card); }, 300);
    });

    card.appendChild(closeBtn);
    card.appendChild(title);
    card.appendChild(desc);
    document.body.appendChild(card);
  }

  // 生成关键词徽章
  function createKeywordBadges(container) {
    if (!container) return;

    const badgeContainer = document.createElement('div');
    badgeContainer.className = 'keyword-badges';
    badgeContainer.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 16px 0;
    `;

    siteConfig.keywords.forEach(function(keyword) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = '#' + keyword;
      badge.style.cssText = `
        display: inline-block;
        background: #e8f5e9;
        color: #2e7d32;
        border-radius: 16px;
        padding: 4px 12px;
        font-size: 13px;
        font-weight: 500;
        border: 1px solid #a5d6a7;
      `;
      badgeContainer.appendChild(badge);
    });

    container.appendChild(badgeContainer);
  }

  // 插入访问说明
  function createAccessGuide() {
    const guide = document.createElement('div');
    guide.className = 'access-guide';
    guide.style.cssText = `
      background: #fff8e1;
      border-left: 4px solid #f9a825;
      padding: 10px 14px;
      margin: 20px 0;
      border-radius: 4px;
      font-size: 14px;
      color: #3e2723;
    `;

    const link = document.createElement('a');
    link.href = siteConfig.siteUrl;
    link.textContent = siteConfig.siteUrl;
    link.target = '_blank';
    link.style.color = '#1565c0';
    link.style.textDecoration = 'underline';

    guide.innerHTML = '📖 访问说明：如需了解更多，请前往 ';
    guide.appendChild(link);
    guide.innerHTML += ' 查看官方信息。';

    document.body.appendChild(guide);
  }

  // 初始化所有功能
  function init() {
    // 等待 DOM 加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        createTipCard();
        // 尝试挂载关键词徽章到某个已有的容器（如果存在），否则创建
        const target = document.querySelector('.content-area, .main-content, #content, article');
        if (target) {
          createKeywordBadges(target);
        } else {
          // 没有合适容器就自己创建一个占位块
          const placeholder = document.createElement('div');
          placeholder.style.display = 'none';
          document.body.appendChild(placeholder);
          createKeywordBadges(placeholder);
        }
        createAccessGuide();
      });
    } else {
      createTipCard();
      const target = document.querySelector('.content-area, .main-content, #content, article');
      if (target) {
        createKeywordBadges(target);
      } else {
        const placeholder = document.createElement('div');
        placeholder.style.display = 'none';
        document.body.appendChild(placeholder);
        createKeywordBadges(placeholder);
      }
      createAccessGuide();
    }
  }

  init();
})();