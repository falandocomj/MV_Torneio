import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm.js";
import { connect } from "react-redux";
import * as actions from "../actions/jogador";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    nome: '',
    sexo: '',
    cpf: ''
}

const JogadorForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nome' in fieldValues)
            temp.nome = fieldValues.nome ? "" : "Este campo é obrigatório!."
        if ('cpf' in fieldValues)
            temp.cpf = fieldValues.cpf ? "" : "Este campo é obrigatório!."
        if ('sexo' in fieldValues)
            temp.sexo = fieldValues.sexo ? "" : "Este campo é obrigatório!."
       
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Salvo com sucesso!", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createJogador(values, onSuccess)
            else
                props.updateJogador(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.jogadorList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <h3>CADASTRAR JOGADOR</h3>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="nome"
                        variant="outlined"
                        label="Nome Completo"
                        value={values.nome}
                        onChange={handleInputChange}
                        {...(errors.nome && { error: true, helperText: errors.nome })}
                    />

                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.sexo && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Escolha o sexo</InputLabel>
                        <Select
                            name="sexo"
                            value={values.sexo}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem>Sexo</MenuItem>
                            <MenuItem value="Feminino">Feminino</MenuItem>
                            <MenuItem value="Masculino">Masculino</MenuItem>
                        </Select>
                        {errors.sexo && <FormHelperText>{errors.sexo}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="cpf"
                        variant="outlined"
                        label="CPF"
                        inputProps = { {
                            maxLength :  14 ,
                         } }    
                        value={values.cpf}
                        onChange={handleInputChange}
                        {...(errors.cpf && { error: true, helperText: errors.cpf })}
                    />                    
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Salvar
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Novo
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    jogadorList: state.jogador.list
})

const mapActionToProps = {
    createJogador: actions.create,
    updateJogador: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(JogadorForm));