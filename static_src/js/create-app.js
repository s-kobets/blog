/* global posts */

function createApp(Vue) {
	// ----------------------
	// Начало кода приложения
	// ----------------------
	// Необходимо вернуть основной экземпляр Vue, а у корневого
	// элемента должен быть id "app", чтобы клиентская версия
	// смогла подхватить работу после загрузки
	return new Vue({
		template: '<div id="app">{{ posts }}</div>',
		data: {
			posts
		}
	});
}

export default createApp;
