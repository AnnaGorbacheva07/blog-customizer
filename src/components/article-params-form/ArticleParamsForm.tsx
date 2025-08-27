import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useEffect, useState } from 'react';

// интерфейс пропсов(Описывает, какие данные и функции принимает форма: состояние открытия, обработчики, начальные параметры.)
interface ArticleParamsFormProps {
	isOpen: boolean;
	onArrowClick: () => void;
	onClose: () => void;
	onApply: (params: {
		fontFamily: OptionType;
		fontSize: OptionType;
		fontColor: OptionType;
		contentWidth: OptionType;
		backgroundColor: OptionType;
	}) => void;
	initialParams: {
		fontFamily: OptionType;
		fontSize: OptionType;
		fontColor: OptionType;
		contentWidth: OptionType;
		backgroundColor: OptionType;
	};
}
//функциональный компонент ArticleParamsForm, который принимает пропсы, соответствующие интерфейсу ArticleParamsFormProps. Этот компонент отображает сайдбар с формой параметров статьи, включая кнопку-стрелку для открытия/закрытия и кнопки для сброса и применения настроек.
export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	isOpen,
	onArrowClick,
	onClose,
	onApply,
	initialParams,
}) => {
	// Состояния для каждого параметра формы
	const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0]);
	const [fontSize, setFontSize] = useState(fontSizeOptions[0]);
	const [fontColor, setFontColor] = useState(fontColors[0]);
	const [contentWidth, setContentWidth] = useState(contentWidthArr[0]);
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
	//При открытии сайдбара, значения параметров формы сбрасываются к начальным
	useEffect(() => {
		if (isOpen) {
			setFontFamily(initialParams.fontFamily);
			setFontSize(initialParams.fontSize);
			setFontColor(initialParams.fontColor);
			setContentWidth(initialParams.contentWidth);
			setBackgroundColor(initialParams.backgroundColor);
		}
	}, [isOpen, initialParams]);
	//Обработчик отправки формы, предотвращает стандартное поведение, вызывает onApply с текущими параметрами и закрывает сайдбар.
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply({
			fontFamily,
			fontSize,
			fontColor,
			contentWidth,
			backgroundColor,
		});
		onClose();
	};
	//Обработчик сброса формы, сбрасывает все параметры к начальным значениям, вызывает onApply с этими значениями и закрывает сайдбар.
	const handleReset = () => {
		setFontFamily(initialParams.fontFamily);
		setFontSize(initialParams.fontSize);
		setFontColor(initialParams.fontColor);
		setContentWidth(initialParams.contentWidth);
		setBackgroundColor(initialParams.backgroundColor);
		onApply(initialParams);
		onClose();
	};

	//возвращает JSX-разметку
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onArrowClick} />
			{isOpen && ( //overlay, закрывает сайдбар по клику вне него.
				<div className={styles.overlay} onClick={onClose}>
					<aside //основной контейнер сайдбара
						className={clsx(styles.container, {
							[styles.container_open]: isOpen,
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
				</div>
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
