import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/jogador";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import JogadorForm from "./JogadorForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Jogadores = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllJogadores()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Deseja apagar este registro?'))
            props.deleteJogador(id,()=>addToast("Apagado com sucesso!", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <JogadorForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Ações</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Sexo</TableCell>
                                    <TableCell>CPF</TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.jogadorList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>                                            
                                            <TableCell>{record.nome}</TableCell>
                                            <TableCell>{record.sexo}</TableCell>
                                            <TableCell>{record.cpf}</TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    jogadorList: state.jogador.list
})

const mapActionToProps = {
    fetchAllJogadores: actions.fetchAll,
    deleteJogador: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Jogadores));