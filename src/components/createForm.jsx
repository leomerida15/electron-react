//
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { IMaskInput } from 'react-imask';
import Card from '@mui/material/Card';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CardMedia from '@mui/material/CardMedia';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import react, { useState, forwardRef } from 'react';
import Upload from '../hook/Upload';

const createForm = ({ fromInput, Action, schema, sx, conten, ButtonClass, buttonText, title, offButton }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		// eslint-disable-next-line react-hooks/rules-of-hooks
	} = useForm(
		schema
			? {
					resolver: yupResolver(schema),
			  }
			: {},
	);

	const onSubmit = handleSubmit((data) => Action(data));

	// const { onChange, value } = field;
	const Input = (input) => {
		// eslint-disable-next-line default-case
		switch (input.type) {
			case 'select':
				return ({ field: { onChange, value } }) => {
					const { currencies, name, label, InputProps } = input;
					if (input.value) value = input.value;

					return (
						<TextField
							id='outlined-select-currency'
							select
							label={label}
							onChange={onChange}
							error={!!errors[name]}
							InputProps={InputProps ? InputProps : {}}
							helperText={errors[name] && errors[name].message}>
							{currencies.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					);
				};
			case 'select-multiple':
				return ({ field: { onChange, value } }) => {
					const { currencies, name, label, InputProps } = input;
					if (input.value) value = input.value;
					const [personName, setPersonName] = react.useState([]);

					const handleChange = (event) => {
						const {
							target: { value },
						} = event;
						setPersonName(
							// On autofill we get a the stringified value.
							typeof value === 'string' ? value.split(',') : value,
						);

						onChange(event);
					};

					return (
						<FormControl sx={{ m: 1 }}>
							<InputLabel id='demo-multiple-checkbox-label'>Tag</InputLabel>
							<Select
								labelId='demo-multiple-checkbox-label'
								id='demo-multiple-checkbox'
								multiple
								value={personName}
								onChange={handleChange}
								InputProps={InputProps ? InputProps : {}}
								input={<OutlinedInput label={label} />}
								renderValue={(selected) => selected.join(', ')}
								MenuProps={currencies}
								error={!!errors[name]}>
								{currencies.map((name) => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={personName.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
					);
				};
			case 'text':
				return ({ field: { onChange, value } }) => {
					const { name, InputProps, label } = input;

					if (input.value) value = input.value;

					return (
						<TextField
							onChange={onChange}
							InputProps={InputProps ? InputProps : {}}
							value={value}
							label={label}
							error={!!errors[name]}
							helperText={errors[name] && errors[name].message}
						/>
					);
				};
			case 'number':
				return ({ field: { onChange, value } }) => {
					const { name, InputProps, label } = input;

					if (input.value) value = input.value;

					return (
						<TextField
							onChange={onChange}
							InputProps={InputProps ? InputProps : {}}
							value={value}
							type='number'
							label={label}
							error={!!errors[name]}
							helperText={errors[name] && errors[name].message}
						/>
					);
				};
			case 'coin':
				return ({ field: { onChange, value } }) => {
					const { name, InputProps, label } = input;

					if (input.value) value = input.value;

					return (
						<TextField
							onChange={onChange}
							InputProps={InputProps ? InputProps : {}}
							value={value}
							type='number'
							label={label}
							error={!!errors[name]}
							helperText={errors[name] && errors[name].message}
						/>
					);
				};
			case 'multi-line':
				return ({ field: { onChange, value } }) => {
					const { name, InputProps, label, rows } = input;

					if (input.value) value = input.value;

					return (
						<TextField
							onChange={onChange}
							InputProps={InputProps ? InputProps : {}}
							value={value}
							type='number'
							multiline
							rows={rows ? rows : 4}
							label={label}
							error={!!errors[name]}
							helperText={errors[name] && errors[name].message}
						/>
					);
				};
			case 'email':
				return ({ field: { onChange, value } }) => {
					const { name, InputProps, label } = input;

					return (
						<TextField
							onChange={onChange}
							InputProps={InputProps ? InputProps : {}}
							value={value}
							label={label}
							type='email'
							error={!!errors[name]}
							helperText={errors[name] && errors[name].message}
						/>
					);
				};
			case 'password-see':
				return ({ field: { onChange, value } }) => {
					const { name, label, InputProps } = input;

					// alert('label', label);

					if (input.value) value = input.value;

					const [values, setValues] = react.useState({ password: value, showPassword: false });

					const handleChange = (prop) => (event) => {
						setValues({ ...values, [prop]: event.target.value });
						onChange(event);
					};

					const handleClickShowPassword = () => {
						setValues({
							...values,
							showPassword: !values.showPassword,
						});
					};

					const handleMouseDownPassword = (event) => event.preventDefault();

					return (
						<FormControl sx={{ m: 1 }} variant='outlined' error={!!errors[name]}>
							<InputLabel htmlFor='outlined-adornment-password'>{label}</InputLabel>
							<OutlinedInput
								id='outlined-adornment-password'
								type={values.showPassword ? 'text' : 'password'}
								value={values.password}
								onChange={handleChange('password')}
								InputProps={InputProps ? InputProps : {}}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'>
											{values.showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label={label}
							/>
						</FormControl>
					);
				};
			case 'password':
				return ({ field: { onChange, value } }) => {
					const { name, InputProps, label } = input;

					if (input.value) value = input.value;

					return (
						<TextField
							InputProps={InputProps ? InputProps : {}}
							onChange={onChange}
							value={value}
							label={label}
							type='password'
							error={!!errors[name]}
							helperText={errors[name] && errors[name].message}
						/>
					);
				};

			case 'phone':
				return ({ field: { onChange, value } }) => {
					const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
						const { onChange, ...other } = props;
						return (
							<IMaskInput
								{...other}
								mask='+58 000-000-0000'
								definitions={{
									'#': /[1-9]/,
								}}
								inputRef={ref}
								onAccept={(value) => onChange({ target: { name: props.name, value } })}
								overwrite
							/>
						);
					});

					TextMaskCustom.propTypes = {
						name: PropTypes.string.isRequired,
						onChange: PropTypes.func.isRequired,
					};

					const [values, setValues] = react.useState({
						textmask: '(100) 000-0000',
						numberformat: '1320',
					});

					const handleChange = (event) => {
						setValues({
							...values,
							[event.target.name]: event.target.value,
						});
					};

					return (
						<Box
							sx={{
								'& > :not(style)': {
									m: 1,
								},
							}}>
							<FormControl variant='standard'>
								<InputLabel htmlFor='formatted-text-mask-input'>react-imask</InputLabel>
								<Input
									value={values.textmask}
									onChange={handleChange}
									name='textmask'
									id='formatted-text-mask-input'
									inputComponent={TextMaskCustom}
								/>
							</FormControl>
						</Box>
					);
				};

			case 'file':
				return ({ field: { onChange, value } }) => {
					const { name, label } = input;

					if (input.value) value = input.value;

					const [select, setSelect] = react.useState(value);

					const handleCapture = (e) => {
						const { path } = e.target.files[0];

						const src = Upload('inputPath', path);
						setSelect(src);

						onChange({ target: { name, value: src } });
					};

					return (
						<div>
							<div className='ed-grid'>
								<Button variant='contained' component='label'>
									<AttachFileIcon />
									Foto
									<input onChange={handleCapture} hidden label={label} type='file' />
								</Button>
							</div>
							<TextField
								hidden
								id={name}
								value={select}
								type='text'
								error={!!errors[name]}
								helperText={errors[name] && errors[name].message}
							/>

							<br />
							<Card>
								{select ? (
									<CardMedia sx={{ maxWidth: 300 }} component='img' image={select} alt='Paella dish' />
								) : (
									<InsertPhotoIcon sx={{ fontSize: 200 }} />
								)}
							</Card>
						</div>
					);
				};

			case 'files':
				return ({ field: { onChange, value } }) => {
					const { name, label } = input;

					if (input.value) value = input.value;

					const [select, setSelect] = react.useState(value);

					const handleCapture = (e) => {
						const paths = e.target.files.map((file) => file.path);

						const src = Upload('inputPaths', paths);
						setSelect(src);

						onChange({ target: { name, value: src } });
					};

					return (
						<div className='ed-grid'>
							<Button variant='contained' component='label'>
								<AttachFileIcon />
								Foto
								<input onChange={handleCapture} hidden label={label} type='file' />
							</Button>

							<br />
							<TextField
								id={name}
								value={select}
								type='text'
								error={!!errors[name]}
								helperText={errors[name] && errors[name].message}
							/>

							<br />
							{select ? (
								<div className='ed-grid m-grid-2'>
									{select.map((item) => (
										<Card>
											<CardMedia sx={{ maxWidth: 300 }} component='img' image={item} alt='Paella dish' />
										</Card>
									))}
								</div>
							) : (
								<Card>
									<InsertPhotoIcon sx={{ fontSize: 200 }} />
								</Card>
							)}
						</div>
					);
				};
		}
	};

	return (
		<Box
			component='form'
			sx={
				sx
					? sx
					: {
							'& > :not(style)': { m: 1 },
					  }
			}
			noValidate
			className={conten ? conten : 'ed-grid'}
			autoComplete='off'
			onSubmit={onSubmit}>
			{title ? (
				typeof title === 'string' ? (
					<div className='s-center'>
						<h1> {title} </h1>
					</div>
				) : typeof title === 'object' ? (
					<div className={title.class}>
						<h1> {title.text} </h1>
					</div>
				) : (
					''
				)
			) : (
				''
			)}

			{/*  */}
			{fromInput.map((item, i) => {
				const { name, rules } = item;
				return (
					<Controller
						name={name}
						control={control}
						rules={rules}
						render={!item.render ? Input(item) : item.render}
						key={i}
					/>
				);
			})}

			{offButton ? (
				<br />
			) : (
				<div className={ButtonClass ? ButtonClass : 's-center'}>
					<Button onClick={handleSubmit(onSubmit)} variant={'contained'}>
						{buttonText ? buttonText : 'Submit'}
					</Button>{' '}
				</div>
			)}
		</Box>
	);
};

createForm.propTypes = {
	fromInput: PropTypes.array.isRequired,
	Action: PropTypes.func.isRequired,
	schema: PropTypes.any.isRequired,
	sx: PropTypes.any,
	buttonText: PropTypes.string,
	conten: PropTypes.string,
	ButtonClass: PropTypes.string,
	title: PropTypes.string,
	offButton: PropTypes.bool,
};

export default createForm;
