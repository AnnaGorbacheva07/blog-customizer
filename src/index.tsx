import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
//функциональный компонент App. Этот код реализует логику открытия и закрытия сайдбара с настройками статьи, управляя состоянием через React. Состояние и обработчики передаются в дочерний компонент, который отвечает за отображение и взаимодействие с сайдбаром.

const App = () => {
	/*// useState хук для создания и управления состоянием внутри.
	// Создаем состояние isSidebarOpen(хранит информацию, открыт ли сайдбар) (булевое значение), setSidebarOpen — функция для изменения этого состояния.
	// Начальное значение — false (сайдбар закрыт).
	const [isSidebarOpen, setSidebarOpen] = useState(false);*/
	// Состояние параметров статьи (articleParams хранит текущие параметры оформления статьи (шрифт, размер, цвет и т.д.),setArticleParams — функция для обновления этих параметров.
	// Начальное значение — объект defaultArticleState, импортированный из констант.)
	const [articleParams, setArticleParams] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	});
	// Обновляет параметры статьи после нажатия "Применить" в форме.
	const handleApply = (params: typeof articleParams) => {
		setArticleParams(params);
	};
	/*//функция обработчик клика по стрелке,меняет состояние на противоположное
	const handleArrowClick = () => setSidebarOpen((prev) => !prev);
	//Функция-обработчик для закрытия сайдбара.
	const handleCloseSidebar = () => setSidebarOpen(false);*/

	// Передаются начальные параметры при открытии сайдбара
	/*
	const initialParams = {
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	};*/
	//Возвращает JSX-разметку.
	return (
		<main //основной контейнер страницы
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamily.value,
					'--font-size': articleParams.fontSize.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm //вставляет компонент формы параметров статьи,получает все нужные пропсы для управления.
				articleParams={articleParams}
				setArticleParams={handleApply}
				/*articleParams={articleParams}
        setArticleParams={handleApply}
				isOpen={isSidebarOpen}
				onArrowClick={handleArrowClick}
				onClose={handleCloseSidebar}*/
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

/*//НАЧАЛЬНЫЙ КОД
import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);*/
