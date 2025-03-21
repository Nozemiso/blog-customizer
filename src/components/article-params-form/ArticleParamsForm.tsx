import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';
import { useState, FormEvent } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

type articleParamsFormProps = {
	applyHandler: (newArticleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ applyHandler }: articleParamsFormProps) => {
	function openFormHandler() {
		setOpen(!isOpen);
	}

	function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const newArticleState: ArticleStateType = {
			fontFamilyOption: selectedFont,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
			fontSizeOption: selectedFontSize,
		};
		applyHandler(newArticleState);
	}

	function formResetHandler(e: FormEvent<HTMLFormElement>) {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
		formSubmitHandler(e);
	}

	const [isOpen, setOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState<OptionType>(
		fontFamilyOptions[0]
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		fontSizeOptions[0]
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		fontColors[0]
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(backgroundColors[0]);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		contentWidthArr[0]
	);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={openFormHandler} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}>
					<div className={styles.fieldsContainer}>
						<Select
							title='Шрифт'
							selected={selectedFont}
							options={fontFamilyOptions}
							onChange={(selected) => setSelectedFont(selected)}
						/>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							selected={selectedFontSize}
							options={fontSizeOptions}
							onChange={(value) => setSelectedFontSize(value)}
						/>
						<Select
							title='Цвет шрифта'
							selected={selectedFontColor}
							options={fontColors}
							onChange={(value) => setSelectedFontColor(value)}
						/>
					</div>
					<Separator />
					<div className={styles.fieldsContainer}>
						<Select
							title='Цвет фона'
							selected={selectedBackgroundColor}
							options={backgroundColors}
							onChange={(value) => setSelectedBackgroundColor(value)}
						/>
						<Select
							title='Ширина контента'
							selected={selectedContentWidth}
							options={contentWidthArr}
							onChange={(value) => setSelectedContentWidth(value)}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
