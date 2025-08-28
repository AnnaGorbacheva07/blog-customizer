import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useEffect, useRef, useState } from 'react';

// интерфейс пропсов(Описывает, какие данные и функции принимает форма: состояние открытия, обработчики, начальные параметры.)

interface ArticleParamsFormProps {
	/*isOpen: boolean;*/
	articleParams: {
		fontFamily: OptionType;
		fontSize: OptionType;
		fontColor: OptionType;
		contentWidth: OptionType;
		backgroundColor: OptionType;
	};
	setArticleParams: (params: {
		fontFamily: OptionType;
		fontSize: OptionType;
		fontColor: OptionType;
		contentWidth: OptionType;
		backgroundColor: OptionType;
	}) => void;
	/*onArrowClick: () => void;
	onClose: () => void;*/
}

//функциональный компонент ArticleParamsForm, который принимает пропсы, соответствующие интерфейсу ArticleParamsFormProps. Этот компонент отображает сайдбар с формой параметров статьи, включая кнопку-стрелку для открытия/закрытия и кнопки для сброса и применения настроек.
export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	/*isOpen,
	onArrowClick,
	onClose,*/
	articleParams,
	setArticleParams,
}) => {
	// useState хук для создания и управления состоянием внутри.
	// Создаем состояние isSidebarOpen(хранит информацию, открыт ли сайдбар) (булевое значение), setSidebarOpen — функция для изменения этого состояния.
	// Начальное значение — false (сайдбар закрыт).
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	//функция обработчик клика по стрелке,меняет состояние на противоположное
	/*const handleArrowClick = () => setSidebarOpen((prev) => !prev);
	//Функция-обработчик для закрытия сайдбара.
	const handleCloseSidebar = () => setSidebarOpen(false);
*/

	// Состояния для каждого параметра формы

	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);

	//При открытии сайдбара, значения параметров формы сбрасываются к начальным
	useEffect(() => {
		setFontFamily(articleParams.fontFamily);
		setFontSize(articleParams.fontSize);
		setFontColor(articleParams.fontColor);
		setContentWidth(articleParams.contentWidth);
		setBackgroundColor(articleParams.backgroundColor);
	}, [articleParams]);
	//Обработчик отправки формы, предотвращает стандартное поведение, вызывает onApply с текущими параметрами и закрывает сайдбар.
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleParams({
			fontFamily: fontFamily,
			fontSize: fontSize,
			fontColor: fontColor,
			contentWidth: contentWidth,
			backgroundColor: backgroundColor,
		});
		setSidebarOpen(false);
		/*onClose();*/
	};
	//Обработчик сброса формы, сбрасывает все параметры к начальным значениям, вызывает onApply с этими значениями и закрывает сайдбар.

	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setContentWidth(defaultArticleState.contentWidth);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setSidebarOpen(false);
		/*onClose();*/
	};
	// Управление событиями клика
	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleClick = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setSidebarOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setSidebarOpen(false);
			}
		};
		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		// Убираем обработчики при размонтировании или изменении зависимостей
		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isSidebarOpen]);

	//возвращает JSX-разметку
	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setSidebarOpen(true)} /*onClick={onArrowClick}*/
			/>
			{isSidebarOpen && ( //overlay, закрывает сайдбар по клику вне него.
				<aside //основной контейнер сайдбара
					ref={formRef}
					className={clsx(styles.container, {
						[styles.container_open]: isSidebarOpen,
					})} //если isOpen true, добавляется класс styles.open для отображения сайдбара.
					onClick={(e) => e.stopPropagation()}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={fontFamily}
							onChange={setFontFamily}
						/>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={fontSize}
							onChange={setFontSize}
						/>
						<Select
							title='Цвет текста'
							options={fontColors}
							selected={fontColor}
							onChange={setFontColor}
						/>
						<RadioGroup
							name='contentWidth'
							title='Ширина контейнера'
							options={contentWidthArr}
							selected={contentWidth}
							onChange={setContentWidth}
						/>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={backgroundColor}
							onChange={setBackgroundColor}
						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
//Вставляется кнопка-стрелка (isOpen — определяет направление стрелки, onClick — обработчик открытия/закрытия сайдбара.)
//Внутри сайдбара — контейнер с формой, в ней две кнопки
//Этот компонент отображает сайдбар с формой, управляет его видимостью через пропсы, обрабатывает клики для открытия/закрытия и содержит кнопки управления настройками статьи.

/*
//НАЧАЛЬНЫЙ КОД
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	return (
		<>
			<ArrowButton isOpen={false} onClick={() => {}} />
			<aside className={styles.container}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};*/
