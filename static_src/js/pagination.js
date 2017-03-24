export default function (totalPages, currentPage) {
		let leftEdge = 2;
		let leftCurrent = 2;
		let rightCurrent = 3;
		let rightEdge = 2;
		let last = 0;
		let objectPages = {};
		let pages = [];

		for (let num = 1; num < totalPages + 1; num += 1) {
			let object = {};

			if (num <= leftEdge || (num > (currentPage - leftCurrent - 1) && num < (currentPage + rightCurrent)) || num > (totalPages - rightEdge)) {
				if ((last + 1) !== num) {
					object.item = '...';
					object.active = false;
					pages.push(object);
				} else if (num === currentPage) {
					object.item = num;
					object.active = true;
					pages.push(object);
				} else {
					object.item = num;
					object.active = false;
					pages.push(object);
				}
				last = num;
			}
		}
		return pages;
}