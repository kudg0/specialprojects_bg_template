// Код для работы lazyload ресурсов

/*
  Для использования нужно вместо 'src' проставлять элементу 'data-lazy-src'
*/

(function() {
  let lazyItems = document.querySelectorAll('[data-lazy-src]');

  lazyItems.forEach((lazyItem) => {
    initLazyLoad(lazyItem);
  });

  function initLazyLoad(lazyItem) {
    let lazyItem__parent = lazyItem.parentNode;

    lazyItem__parent.classList.add('lazyloadItem');

    lazyItem.getAttribute('data-lazy-theme') === 'black'
      ? lazyItem__parent.classList.add('lazyloadItem_black')
      : lazyItem__parent.classList.add('lazyloadItem_white');
  }

  /*
    Проверяем поддержку IntersectionObserver, если она есть – пользуемся ей для определеения элементов в области видимости;
    если нет – делаем все элементы в области видимости by default
  */
  try {
    if (!window['IntersectionObserver']) {
      throw new Error('References errors with IntersectionObserver');
    }

    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.001,
    };
    let callback = function(entries, observer) {
      entries.forEach((item) => {
        if (
          item.isIntersecting &&
          !item.target.classList.contains('lazyInit')
        ) {
          item.target.classList.add('lazyInit');

          loadImage(item.target);
        }
      });
    };
    let observer = new IntersectionObserver(callback, options);

    lazyItems.forEach((lazyItem) => {
      setInitSizes(lazyItem);

      observer.observe(lazyItem);
    });
  } catch (e) {
    lazyItems.forEach((lazyItem) => {
      setInitSizes(lazyItem);

      lazyItem.classList.add('lazyInit');

      loadImage(lazyItem);
    });
  }

  function setInitSizes(imageItem) {
    let lazyItem__width = imageItem.getAttribute('width'),
      lazyItem__height = imageItem.getAttribute('height');

    if (deviceType.isMobile()) {
      lazyItem__width = imageItem.getAttribute('width_mobile')
        ? imageItem.getAttribute('width_mobile')
        : lazyItem__width;
      lazyItem__height = imageItem.getAttribute('height_mobile')
        ? imageItem.getAttribute('height_mobile')
        : lazyItem__height;
    }

    imageItem.style.width = lazyItem__width + 'px';
    imageItem.style.height = lazyItem__height + 'px';
    imageItem.style.transform = 'translate3d(-.2vw, -.2vw, -.2vw)';
  }

  function loadImage(imageItem) {
    let neededSrc = imageItem.getAttribute('data-lazy-src');

    imageItem.addEventListener('load', () => {
      imageItem.parentNode.classList.add('lazyLoaded');

      imageItem.removeAttribute('data-lazy-src');
      imageItem.removeAttribute('style');

      imageItem.style.transform = 'translate3d(-.1vw, -.1vw, -.1vw)';

      setTimeout(() => {
        imageItem.removeAttribute('style');
      }, 200);
    });

    imageItem.src = neededSrc;
  }
})();
