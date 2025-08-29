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
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

// интерфейс пропсов(Описывает, какие данные и функции принимает форма)

interface ArticleParamsFormProps {
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
}

//функциональный компонент ArticleParamsForm, который принимает пропсы, соответствующие интерфейсу ArticleParamsFormProps. Этот компонент отображает сайдбар с формой параметров статьи, включая кнопку-стрелку для открытия/закрытия и кнопки для сброса и применения настроек.
export const ArticleParamsForm = ({
	articleParams,
	setArticleParams,
}: ArticleParamsFormProps) => {
	// useState хук для создания и управления состоянием внутри.
	// Создаем состояние isSidebarOpen(хранит информацию, открыт ли сайдбар) (булевое значение), setSidebarOpen — функция для изменения этого состояния.
	// Начальное значение — false (сайдбар закрыт).
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	// Подключаем хук закрытия по клику вне сайдбара
	useOutsideClickClose({
		isOpen: isSidebarOpen,
		onChange: setSidebarOpen,
		rootRef: formRef,
	});

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

	//Параметры при открытии сайдбара
	useEffect(() => {
		setFontFamily(articleParams.fontFamily);
		setFontSize(articleParams.fontSize);
		setFontColor(articleParams.fontColor);
		setContentWidth(articleParams.contentWidth);
		setBackgroundColor(articleParams.backgroundColor);
	}, [articleParams]);
	//Обработчик отправки формы, предотвращает стандартное поведение, вызывает setArticleParams с текущими параметрами и закрывает сайдбар.
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleParams({
			fontFamily,
			fontSize,
			fontColor,
			contentWidth,
			backgroundColor,
		});
		setSidebarOpen(false);
	};
	//Обработчик сброса формы, сбрасывает все параметры к начальным значениям, вызывает onApply с этими значениями и закрывает сайдбар.
	const handleReset = () => {
		// Сбрасываем локальные состояния формы
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setContentWidth(defaultArticleState.contentWidth);
		setBackgroundColor(defaultArticleState.backgroundColor);

		// Обновляем состояние статьи
		setArticleParams({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			contentWidth: defaultArticleState.contentWidth,
			backgroundColor: defaultArticleState.backgroundColor,
		});

		setSidebarOpen(false);
	};

	// Обработчик закрытия по ESC
	useEffect(() => {
		if (isSidebarOpen) {
			const handleKeyDown = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					setSidebarOpen(false);
				}
			};

			window.addEventListener('keydown', handleKeyDown);

			return () => {
				window.removeEventListener('keydown', handleKeyDown);
			};
		}
	}, [isSidebarOpen]);

	//возвращает JSX-разметку
	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setSidebarOpen(true)}
			/>
			{isSidebarOpen && (
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
