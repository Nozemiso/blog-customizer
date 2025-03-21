import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';
import { useState, FormEvent, useRef } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'components/article-params-form/hooks/useOutsideClickClose';

type articleParamsFormProps = {
	applyHandler: (newArticleState: ArticleStateType) => void;
	defaultValues: ArticleStateType;
};

export const ArticleParamsForm = ({
	applyHandler,
	defaultValues,
}: articleParamsFormProps) => {
	function openFormHandler() {
		setOpen(!isOpen);
	}

	function collectFormData(): ArticleStateType {
		return {
			fontFamilyOption: selectedFont,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
			fontSizeOption: selectedFontSize,
		};
	}

	function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		applyHandler(collectFormData());
	}

	function formResetHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSelectedFont(defaultValues.fontFamilyOption);
		setSelectedFontSize(defaultValues.fontSizeOption);
		setSelectedFontColor(defaultValues.fontColor);
		setSelectedBackgroundColor(defaultValues.backgroundColor);
		setSelectedContentWidth(defaultValues.contentWidth);
		applyHandler(defaultValues);
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

	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: openFormHandler,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={openFormHandler} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}>
					<Text as={'h1'} weight={800} size={31}>
						Задайте параметры
					</Text>
					<div className={styles.fieldsContainer}>
						<Select
							title='Шрифт'
							selected={selectedFont}
							options={fontFamilyOptions}
							onChange={(value) => setSelectedFont(value)}
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
