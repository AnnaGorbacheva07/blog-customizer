import { CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

//функциональный компонент App. Этот код реализует логику открытия и закрытия сайдбара с настройками статьи, управляя состоянием через React. Состояние и обработчики передаются в дочерний компонент, который отвечает за отображение и взаимодействие с сайдбаром.

export const App = () => {
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

	//Возвращает JSX-разметку.
	return (
		<main //основной контейнер страницы
			className={styles.main}
			style={
				{
					'--font-family': articleParams.fontFamily.value,
					'--font-size': articleParams.fontSize.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm //вставляет компонент формы параметров статьи
				articleParams={articleParams}
				setArticleParams={handleApply}
			/>
			<Article />
		</main>
	);
};
