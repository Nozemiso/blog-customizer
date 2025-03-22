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
	defaultArticleState,
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
};

export const ArticleParamsForm = ({ applyHandler }: articleParamsFormProps) => {
	function openFormHandler() {
		setOpen(!isOpen);
	}

	function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		applyHandler(formState);
	}

	function formResetHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setFormState(defaultArticleState);
		applyHandler(defaultArticleState);
	}

	function handleOnChange(field: keyof ArticleStateType) {
		return (value: OptionType) => {
			setFormState({ ...formState, [field]: value });
		};
	}

	const [isOpen, setOpen] = useState(false);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

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
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleOnChange('fontFamilyOption')}
						/>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							onChange={handleOnChange('fontSizeOption')}
						/>
						<Select
							title='Цвет шрифта'
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleOnChange('fontColor')}
						/>
					</div>
					<Separator />
					<div className={styles.fieldsContainer}>
						<Select
							title='Цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleOnChange('backgroundColor')}
						/>
						<Select
							title='Ширина контента'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleOnChange('contentWidth')}
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
