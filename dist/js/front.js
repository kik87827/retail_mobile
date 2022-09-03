document.addEventListener("DOMContentLoaded", function() {
  commonInit();
  commonLayout();
  commonEvent();
  dropMenu();
  quickLayer();
  mainVisual();
  subSearchForm();
  commonTab();
  commonForm();
});
window.addEventListener("load", function() {});

function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf('samsung') > -1) {
    browserAdd("samsung");
  }

  if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }


  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}


function commonLayout() {
  function mbTotal() {
    let touchstart = "ontouchstart" in window;
    let btn_htotal = document.querySelector(".btn_util.ico_menu"),
      mobile_mainmenu_zone = document.querySelector(".mobile_mainmenu_zone"),
      btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
      domHtml = document.querySelector("html"),
      domBody = document.querySelector("body"),
      mbmenu_li = document.querySelectorAll(".mbmenu_list > li");
    mbmenu_tab = document.querySelectorAll(".mbmenu_tab");
    hasToggle_menu = document.querySelectorAll(".has_two .mbmenu_one");

    // init 
    if (mobile_mainmenu_zone === null) {
      return;
    }

    btn_htotal.addEventListener("click", (e) => {

      e.preventDefault();
      totalOpen();
    }, false);


    btn_mbmenuclose.addEventListener("click", (e) => {
      e.preventDefault();

      totalClose();
    }, false);

    const menuOpenEvent = new CustomEvent('openMenu');

    mobile_mainmenu_zone.addEventListener("openMenu", () => {
      totalOpen();
    });

    // mobile_mainmenu_zone.dispatchEvent(menuOpenEvent);

    mbmenu_tab.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let thisObj = e.currentTarget;
        let thisObjParent = thisObj.closest("li");
        let thisObjParentNot = siblings(thisObjParent);
        let thisObjTarget = document.querySelector(thisObj.getAttribute("href"));
        let thisObjTargetNot = siblings(thisObjTarget);
        if (thisObjTarget !== null) {
          thisObjTargetNot.forEach((element) => {
            element.classList.remove("active");
          });
          thisObjTarget.classList.add("active");
        }

        thisObjParentNot.forEach((element) => {
          element.classList.remove("active");
        });
        thisObjParent.classList.add("active");
      }, false);
    });

    hasToggle_menu.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let thisObj = e.currentTarget;
        let thisObjParent = thisObj.closest("li");
        // let thisObjParentSiblings = siblings(thisObjParent);
        let thisObjMenuList = thisObj.nextElementSibling;

        // thisObjParentSiblings.forEach((element)=>{
        //   element.classList.remove("active");
        // });
        mbmenu_li.forEach((element) => {
          element.classList.remove("active");
        });

        thisObjParent.classList.toggle("active");
        thisObjMenuList.classList.toggle("active");
      }, false)
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1023 && mobile_mainmenu_zone.classList.contains("active")) {
        totalClose();
      }
    });

    function totalOpen() {
      mobile_mainmenu_zone.classList.add("active");
      setTimeout(() => {
        mobile_mainmenu_zone.classList.add("motion");
        if (!touchstart) {
          return;
        }
        domBody.setAttribute("data-scr", window.pageYOffset);
        domBody.style.marginTop = -window.pageYOffset + "px";
        domHtml.classList.add("touchDis");
      }, 30);
    }

    function totalClose() {
      mobile_mainmenu_zone.classList.remove("motion");
      setTimeout(() => {
        mobile_mainmenu_zone.classList.remove("active");
        if (!touchstart) {
          return;
        }
        domHtml.classList.remove("touchDis");
        domBody.style.marginTop = 0;
        window.scrollTo(0, parseInt(domBody.getAttribute("data-scr")));
      }, 500);
    }
  }

  mbTotal();
}

function rockMenu(one, two, three) {
  let oneItem = document.querySelector(one);
  let oneItemTarget = document.querySelector(oneItem.querySelector(".mbmenu_tab").getAttribute("href"));
  let oneItemNot = siblings(oneItem);
  let twoItem = document.querySelector(two);
  let twoItemNot = twoItem !== null ? siblings(twoItem) : null;

  let threeItem = three !== null ? document.querySelector(three) : null;

  if (oneItem !== null) {
    oneItemNot.forEach((element) => {
      element.classList.remove("active");
    });
    if (oneItemTarget !== null) {
      oneItemTarget.classList.add("active");
    }
    oneItem.classList.add("active");
  }
  if (twoItem !== null) {
    twoItemNot.forEach((element) => {
      element.classList.remove("active");
    })
    twoItem.classList.add("active");
  }

  if (threeItem !== null) {
    if (threeItem.closest(".mbmenu_two_list") !== null) {
      threeItem.closest(".mbmenu_two_list").classList.add("active");
    }
    threeItem.classList.add("active");
  }
}


function commonEvent() {
  let windowWidth = 0;
  action();
  window.addEventListener("resize", () => {
    if (windowWidth === window.innerWidth) {
      return;
    }
    action();
    windowWidth = window.innerWidth;
  });

  function action() {
    dropMenuCssAction();
  }
}

function commonForm() {
  addDynamicEventListener(document.body, 'change', '.form_select', function(e) {
    let thisTarget = e.target;
    if (thisTarget.value === "0") {
      thisTarget.classList.add("ready");
    } else {
      console.log(thisTarget.value);
      thisTarget.classList.remove("ready");
    }
  });
}


// 모달

function DesignModal(option) {
  this.message = option.message;
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.design_modal_wrap = null;
  this.btn_dmsmidentify = null;
  this.btn_dmsmcancel = null;
  this.duration = option.duration !== undefined ? option.duration : 400;

  this.initShow(option);
}

DesignModal.prototype.initShow = function(option) {
  var innerPublish = '';
  var objThis = this;
  innerPublish += "<div class='design_modal_wrap'>";
  innerPublish += "  <div class='bg_design_modal'></div>";
  innerPublish += "  <div class='design_modal_w'>";
  innerPublish += "          <div class='design_modal'>";
  innerPublish += "              <div class='design_modal_cont_w'><div class='design_modal_text'></div></div>";
  innerPublish += "              <div class='btn_dmsm_wrap'>";
  innerPublish += "                  <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>확인</a>";
  if (option.type === "confirm") {
    innerPublish += "              <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>";
  }
  innerPublish += "              </div>";
  innerPublish += "          </div>";
  innerPublish += "  </div>";
  innerPublish += "</div>";
  this.modalparent = document.createElement('div');
  this.pagewrap.appendChild(this.modalparent);
  this.modalparent.classList.add("design_modal_insert_wrap");
  this.modalparent.innerHTML = innerPublish;

  if (option.type === "confirm" || option.type === "alert") {
    this.design_modal_text = document.querySelector(".design_modal_text");
    this.btn_dmsmidentify = document.querySelector(".btn_dmsmidentify");
    this.design_modal_text.innerHTML = option.message;
  }
  if (option.type === "confirm") {
    this.btn_dmsmcancel = document.querySelector(".btn_dmsmcancel");
  }
  this.pagewrap.style.zIndex = 0;
  this.domBody.setAttribute("data-scr", window.pageYOffset);
  this.domBody.style.marginTop = -window.pageYOffset + "px";
  this.domHtml.classList.add("touchDis");
  this.design_modal_wrap = document.querySelector(".design_modal_wrap");
  this.closetrigger = document.querySelectorAll(".close_dmtrigger");
  this.design_modal_wrap.classList.add("active");
  setTimeout(function() {
    objThis.design_modal_wrap.classList.add("motion");
  }, 30);
  this.bindEvent(option);
}
DesignModal.prototype.removeHide = function() {
  var objThis = this;
  this.design_modal_wrap.classList.remove("motion");
  setTimeout(function() {
    objThis.design_modal_wrap.classList.remove("active");
    document.querySelector(".design_modal_insert_wrap").remove();
    objThis.design_modal_wrap.remove();
    objThis.domHtml.classList.remove("touchDis");
    objThis.domBody.style.marginTop = 0;

    window.scrollTo(0, Number(objThis.domBody.getAttribute("data-scr")));
  }, 530);
}
DesignModal.prototype.bindEvent = function(option) {
  var objThis = this;
  for (var i = 0; i < this.closetrigger.length; i++) {
    this.closetrigger[i].addEventListener("click", function() {
      objThis.removeHide();
    }, false);
  }
  if (this.btn_dmsmidentify !== null) {
    this.btn_dmsmidentify.addEventListener("click", function() {
      if (option.identify_callback !== undefined) {
        option.identify_callback();
      }
    }, false);
  }
  if (this.btn_dmsmcancel !== null) {
    this.btn_dmsmcancel.addEventListener("click", function() {
      if (option.cancel_callback !== undefined) {
        option.cancel_callback();
      }
    }, false);
  }
}




function DesignPopup(option) {
  this.selector = null;
  this.option = option;
  if (option.selector !== undefined) {
    this.selector = document.querySelector(option.selector);
  }
  this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.btn_closeTrigger = null;
  this.btn_popupClose = null;
  this.bg_design_popup = null;
  this.scrollValue = 0;
  this.popupShow(option.selector);
}

DesignPopup.prototype.popupShow = function(target) {
  var objThis = this;
  var touchstart = "ontouchstart" in window;
  this.selector = document.querySelector(target);
  if (this.selector == null) {
    return;
  }
  this.scrollValue = window.pageYOffset;
  if (touchstart) {
    this.domBody.setAttribute("data-scr", window.pageYOffset);
    this.domBody.style.marginTop = -window.pageYOffset + "px";
    this.domHtml.classList.add("touchDis");
  }
  this.selector.classList.add("active");
  setTimeout(function() {
    objThis.selector.classList.add("motion");
  }, 30);

  if (this.option.callback) {
    this.option.callback();
  }


  this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
  this.btn_popupClose = this.selector.querySelector(".btn_popup_close");

  this.bg_design_popup = this.selector.querySelector(".popup_wrap .bg_dim");
  this.domBody.append(this.selector);
  this.bindEvent(this.selector);

}
DesignPopup.prototype.popupHide = function(target) {
  var objThis = this;
  var touchstart = "ontouchstart" in window;
  if (target !== undefined) {
    if (typeof target == "object") {
      this.selector = target;
    } else {
      this.selector = document.querySelector(target);
    }
    this.selector.classList.remove("motion");
    setTimeout(function() {
      //remove
      objThis.selector.classList.remove("active");
      objThis.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
      if (objThis.design_popup_wrap_active.length == 0) {
        if (touchstart) {
          objThis.domHtml.classList.remove("touchDis");
          objThis.domBody.style.marginTop = 0;
          window.scrollTo(0, parseInt(objThis.domBody.getAttribute("data-scr")));
        }
      }
    }, 420);
  }
}

DesignPopup.prototype.bindEvent = function() {
  var objThis = this;

  if (this.btn_closeTrigger.length) {
    for (var i = 0; i < this.btn_closeTrigger.length; i++) {
      this.btn_closeTrigger[i].addEventListener("click", function() {
        objThis.popupHide(objThis.selector);
      }, false);
    }
  }

  if (this.bg_design_popup !== null) {
    this.bg_design_popup.addEventListener("click", function(e) {
      e.preventDefault();
      objThis.popupHide(objThis.selector);
    }, false);
  }

  if (this.btn_popupClose !== null) {
    this.btn_popupClose.addEventListener("click", function(e) {
      e.preventDefault();
      objThis.popupHide(objThis.selector);
    }, false);
  }
};



function dropMenu() {
  let pagewrap = document.querySelector(".page_wrap");
  let dropmenu_call = document.querySelectorAll(".dropmenu_call");
  let dropmenu_option_list_wrap_active = null;

  dropMenuReady(dropmenu_call);
  addDynamicEventListener(document.body, 'click', '.dropmenu_call', function(e) {
    let thisTarget = e.target;
    let thisTargetName = thisTarget.getAttribute("name");
    let thisTargetOption = null;
    thisTargetOption = document.querySelector(`[data-dropmenu='${thisTargetName}']`);
    thisTargetOption.classList.toggle("active");
  });

  document.body.addEventListener("click", (e) => {
    if (e.target.closest(".dropmenu_item") !== null || e.target.closest(".dropmenu_option_list_wrap") !== null) {
      return;
    }
    dropmenu_option_list_wrap_active = document.querySelectorAll(".dropmenu_option_list_wrap.active");
    if (dropmenu_option_list_wrap_active.length) {
      dropmenu_option_list_wrap_active.forEach((element) => {
        element.classList.remove("active");
      });
    }
  }, false);

  function dropMenuReady() {
    dropmenu_call.forEach((element) => {
      let thisTarget = element;
      let thisTargetName = thisTarget.getAttribute("name");
      let thisTargetOption = thisTarget.nextElementSibling;
      if (thisTargetOption === null) {
        return
      }
      if (thisTargetOption.classList.contains("dropmenu_option_list_wrap")) {
        thisTargetOption.setAttribute("data-dropmenu", thisTargetName);
      }
      pagewrap.append(thisTargetOption);
    });
    dropMenuCssAction();
  }
}

function dropMenuCssAction() {
  let dropmenuItem = document.querySelectorAll("[data-dropmenu]");
  if (dropmenuItem.length === 0) {
    return;
  }
  setTimeout(() => {
    dropmenuItem.forEach((element) => {
      let thisObj = element;
      let thisObjData = thisObj.getAttribute("data-dropmenu");
      let targetObj = document.querySelector(`[name='${thisObjData}']`);
      if (targetObj !== null) {
        thisObj.style.top = (targetObj.getBoundingClientRect().top + window.scrollY + targetObj.getBoundingClientRect().height) + "px";
        thisObj.style.left = (targetObj.getBoundingClientRect().left - 1) + "px";
        thisObj.style.width = (targetObj.getBoundingClientRect().width + 2) + "px";
      }
    });
  }, 50);
}

function siblings(t) {
  let children = t.parentElement.children;
  let tempArr = [];

  for (let i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }

  return tempArr.filter((e) => {
    return e != t;
  });
}

// main
function mainVisual() {
  let mv_searchinput = document.querySelector(".mv_searchinput");
  if (mv_searchinput === null) {
    return;
  }
  mv_searchinput.addEventListener("focus", (e) => {
    let thisObj = e.currentTarget;
    let thisObjParent = thisObj.closest(".mv_searchform");
    thisObjParent.classList.add("active");
  }, false);
  mv_searchinput.addEventListener("focusout", (e) => {
    let thisObj = e.currentTarget;
    let thisObjParent = thisObj.closest(".mv_searchform");
    thisObjParent.classList.remove("active");
  }, false);
}

function popularRankFunc() {
  let popularRank = null;
  const mc_popular_slide = document.querySelectorAll(".mc_popular_container .swiper-slide");
  if (mc_popular_slide.length <= 1) {
    return;
  }
  if (popularRank === null) {
    popularRank = new Swiper(".mc_popular_container", {
      autoHeight: true,
      direction: "vertical",
      resistanceRatio: '0',
      allowTouchMove: false,
      loop: true,
      speed: 520,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
    });
    // popularRank.slideTo(2);
  } else {
    popularRank.update();
  }
}


function consumerRankFunc() {
  let consumerRank = null;
  const mc_consumer_slide = document.querySelectorAll(".mc_consumer_container .swiper-slide");
  if (mc_consumer_slide.length <= 1) {
    return;
  }
  if (consumerRank === null) {
    consumerRank = new Swiper(".mc_consumer_container", {
      autoHeight: true,
      direction: "vertical",
      resistanceRatio: '0',
      allowTouchMove: false,
      loop: true,
      speed: 520,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
    });
  } else {
    consumerRank.update();
  }
}


function mainTabFunc() {
  let d_mctab = document.querySelectorAll(".d_tab_group");
  d_mctab.forEach((group) => {
    let thisGroup = group;
    let thisGroupTab = thisGroup.querySelectorAll(".mc_text_tab");
    thisGroupTab.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        let thisObj = e.currentTarget;
        let thisObjParent = thisObj.closest("li");
        let thisObjTarget = document.querySelector(thisObj.getAttribute("href"));
        let thisObjTargetNot = siblings(thisObjTarget);
        let thisObjNot = siblings(thisObjParent);
        if (thisObjTarget !== null) {
          thisObjNot.forEach((element) => {
            element.classList.remove("active");
          });
          thisObjParent.classList.add("active");

          thisObjTargetNot.forEach((element) => {
            element.classList.remove("active");
          });
          thisObjTarget.classList.add("active");
        }
      }, false);
    });
  });
}

function quickLayer() {
  let quick_layer_wrap = document.querySelector(".quick_layer_wrap");
  if (quick_layer_wrap === null) {
    return;
  }
  window.addEventListener("scroll", (e) => {
    if (window.scrollY >= document.querySelector("body").scrollHeight - window.innerHeight) {
      hideMotion();
    } else {
      showMotion();
    }
  }, false);


  function showMotion() {
    let count = 0;
    let timeoutNum = 0;
    if (count > 2) {
      return;
    }
    // if(timeoutNum){clearTimeout(timeoutNum)}
    quick_layer_wrap.style.display = "block";
    // timeoutNum = setTimeout(()=>{
    //  quick_layer_wrap.classList.remove("opacity_hidden");
    // },510);
    count++;
  }

  function hideMotion() {
    let count = 0;
    let timeoutNum = 0;
    if (count > 2) {
      return;
    }
    // if(timeoutNum){clearTimeout(timeoutNum)}
    // quick_layer_wrap.classList.add("opacity_hidden");
    //  timeoutNum = setTimeout(()=>{
    // },510);
    quick_layer_wrap.style.display = "none";
    count++;
  }
}


function scToggleList() {
  const sc_toggle_li = document.querySelectorAll(".sc_toggle_list > li");
  const htmlObj = document.querySelector("html");
  const header = document.querySelector(".header_wrap");
  let headerHeight = header !== undefined ? header.getBoundingClientRect().height : 0;
  if (sc_toggle_li.length) {
    htmlObj.classList.add("smooth");
    sc_toggle_li.forEach((element) => {
      let thisLiObj = element;
      let thisLiObjNot = siblings(thisLiObj);
      let thisLiObjBar = thisLiObj.querySelector(".sc_toggle_bar");
      thisLiObjBar.addEventListener("click", (e) => {
        e.preventDefault();
        thisLiObjNot.forEach((element) => {
          element.classList.remove("active");
        });
        thisLiObj.classList.toggle("active");
        if (thisLiObj.classList.contains("active")) {
          window.scrollTo(0, thisLiObj.getBoundingClientRect().top + window.scrollY - headerHeight);
        }
      }, false);
    });
  }
}


function subSearchForm() {
  let sc_search_input = document.querySelector(".sc_search_input");
  if (sc_search_input === null) {
    return;
  }
  sc_search_input.addEventListener("focus", (e) => {
    let thisObj = e.currentTarget;
    let thisObjParent = thisObj.closest(".sc_search_form");
    thisObjParent.classList.add("active");
  }, false);
  sc_search_input.addEventListener("focusout", (e) => {
    let thisObj = e.currentTarget;
    let thisObjParent = thisObj.closest(".sc_search_form");
    thisObjParent.classList.remove("active");
  }, false);
}

function tabmenuActionFunc(target) {
  let targetObj = document.querySelectorAll(target);
  //let targetObjNot = siblings(targetObj);
  if (targetObj.length) {
    // targetObjNot.forEach((element) => {
    //   element.classList.remove("active");
    // });
    targetObj.forEach((element) => {
      let thisObj = element;
      thisObj.addEventListener("click", (e) => {
        e.preventDefault();
        let currentTarget = e.currentTarget;
        let currentTargetParent = currentTarget.closest("li");
        let currentTargetParentNot = siblings(currentTargetParent);
        currentTargetParentNot.forEach((element) => {
          element.classList.remove("active");
        });
        currentTargetParent.classList.add("active");
      }, false);
      // this_targetObj_children.addEventListener("click",(e)=> {
      //   e.preventDefault();
      //   let thisObj = e.currentTarget;
      //   let thisObjParent = thisObj.closest("li");
      //   thisObjParent.classList.add("active");
      // },false);
    });
  }
}

function nativeMonth(option) {
  let native_formitem_wrap = document.querySelector(option.target);
  let native_formitem = native_formitem_wrap.querySelector(".native_formitem");

  // init
  formatValue(native_formitem);

  // event
  native_formitem.addEventListener("change", (e) => {
    let thisObj = e.currentTarget;
    formatValue(thisObj);
    if (option.callback !== undefined) {
      option.callback();
    }
  }, false);

  function formatValue(target) {
    let targetObj = target;
    let targetObjParent = targetObj.closest(".native_formitem_wrap");
    let targetObjParentDomValue = targetObjParent.querySelector(".native_formitem_value");
    let target_value = targetObj.value.split("-");
    let target_parse = target_value[0] + "." + target_value[1];
    targetObjParentDomValue.innerHTML = target_parse;
  }
}


function commonTab() {
  addDynamicEventListener(document.body, 'click', '.d_tab_parent .d_tab', function(e) {
    e.preventDefault();
    tabFunc(e.target);
  });

  function tabFunc(target) {
    const targetTab = target;
    const targetTabParent = targetTab.closest("li");
    const targetTabSiblings = siblings(targetTabParent);
    const targetTabCont = targetTab.getAttribute("href").split("#")[1];
    const targetTabContDom = document.querySelectorAll(`[name="${targetTabCont}"]`);

    targetTabSiblings.forEach((element) => {
      element.classList.remove("active");
    });
    targetTabParent.classList.add("active");

    if (targetTabContDom.length) {
      targetTabContDom.forEach((elementDom) => {
        siblings(elementDom).forEach((element) => {
          element.classList.remove("active");
        });
        elementDom.classList.add("active");
      })
    }
  }
}