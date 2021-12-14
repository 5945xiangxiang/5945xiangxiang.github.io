window.onload = function () {
// 轮播图切换
	var cricle = document.querySelector(".cricle");
	var banner_img = document.querySelector(".banner_img");
	var allLi = banner_img.children;
	var banner_wrap = document.querySelector(".banner_wrap ");
	var bannerWidth = banner_wrap.offsetWidth;
	var right_btn = document.querySelector(".right_btn");
	var left_btn = document.querySelector(".left_btn");
	var num = 0;

	// console.log(bannerWidth);
	changeCricle();
function changeCricle() {
		//小圆圈的切换 自动获取小li的个数,并添加li在小cricle中  动态生成li	
		for (var i = 0; i < allLi.length - 1; i++) {
			var li = document.createElement("li");
			index = i;
			cricle.appendChild(li);
			cricle.children[0].classList.add("current");
			li.setAttribute("index", index);
			// 移出小白点、排他思想
			li.addEventListener("click",function (e) {
				for (var i = 0; i < cricle.children.length; i++){
					cricle.children[i].classList.remove("current");
				}
				this.classList.add("current");
			//点击小圆点切换图片  ，移动距离小圆圈的序号×.banner_wrap 的大小
			//  console.log(	this.getAttribute("index"));		
				var movex = this.getAttribute("index") * bannerWidth;
				// console.log(movex);
				animate(banner_img, -movex)
			})
	}

	}
	// console.log(criclelength);
// 封装一个动画函数
	function animate( obj,target,callback) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function (params) {
			var step = (target - obj.offsetLeft) / 10;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			if (obj.offsetLeft == target) {
				clearInterval(obj.timer);
				callback && callback();
			} else {
				obj.style.left = obj.offsetLeft + step + "px";
			}
			
		},15)
	}

// 点击右侧按钮实现无缝切换
	right_btn.addEventListener("click",function () {
		
		if (num == allLi.length - 1) {
			banner_img.style.left = 0 + "px";
			num = 0;
		} else {
		num++;
			animate(banner_img, -num * bannerWidth);
			for (var i = 0; i < cricle.children.length; i++){
				cricle.children[i].classList.remove("current");
			}
			if (num == 4) {
				cricle.children[0].classList.add("current");	
			} else {
				cricle.children[num].classList.add("current");
			}		
		}
		// console.log(banner_img.style.left);
	})
// 左侧
left_btn.addEventListener("click",function () {	
	if (num == 0) {
		// console.log(allLi[allLi.length - 2].offsetLeft);
		banner_img.style.left = -allLi[allLi.length - 2].offsetLeft + "px";
		num = 4;
		//num==4
		
	} else {
		num--;
		animate(banner_img, -num * bannerWidth);
		for (var i = 0; i < cricle.children.length; i++) {
			cricle.children[i].classList.remove("current");
		}
		if (num == 3) {
			cricle.children[3].classList.add("current");
		} else {
			cricle.children[num].classList.add("current");
		}
	}
})



	
	// 鼠标移动到。content_one上切换图片
	var content_one_img = document.getElementsByClassName("content_one_img");
	for (var i = 0; i < content_one_img.length; i++){
		content_one_img[i].addEventListener("mouseover", function () {
			var newsrc = this.getAttribute("src");
			var num = parseInt(newsrc.slice(-5, -4));
			 this.setAttribute("src","img/design"+(num+1)+".png")
		})
		content_one_img[i].addEventListener("mouseout", function () {
			var newsrc = this.getAttribute("src");
			var num = parseInt(newsrc.slice(-5, -4));
			if (num == 0) {
				num = parseInt(newsrc.slice(-6, -4));
				console.log(num);
				this.setAttribute("src", "img/design" + (num - 1) + ".png")
			} else {
				this.setAttribute("src", "img/design" + (num - 1) + ".png")
			}
		})
	}



















}