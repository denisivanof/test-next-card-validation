import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
    Box, Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    FormControl,
    FormHelperText,
    Input,
    InputLabel, OutlinedInput,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import TextMaskCustom from "../components/TextMaskCustom";

export default function Home() {
    const [values, setValues] = useState({
        CardNumber: '',
        ExpDate: '',
        Cvv: '',
        Amount: '',
    });
    const [error, setError] = useState({
        CardNumber: false,
        ExpDate: false,
        Cvv: false,
        Amount: false,
    })
    const [focus, setFocus] = useState({
        CardNumber: false,
        ExpDate: false,
        Cvv: false,
        Amount: false,
    })
    const [Disabled, setDisabled] = useState(true)
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
    useEffect(()=>{
        if(focus.CardNumber && values.CardNumber.replace(/[^0-9]/g, '').length < 16){
            setError({...error, CardNumber: true})
        }else {
            setError({...error, CardNumber: false})
        }
    }, [values.CardNumber])
    useEffect(()=>{
        if(focus.ExpDate && values.ExpDate.length < 7){
            setError({...error, ExpDate: true})
        }else {
            setError({...error, ExpDate: false})
        }
    }, [values.ExpDate])
    useEffect(()=>{
        if(focus.Cvv && values.Cvv.length < 3){
            setError({...error, Cvv: true})
        }else {
            setError({...error, Cvv: false})
        }
    }, [values.Cvv])
    useEffect(()=>{
        if(focus.Amount && !values.Amount.length){
            setError({...error, Amount: true})
        }else {
            setError({...error, Amount: false})
        }
        console.log(Disabled)
    }, [values.Amount])
    useEffect(()=>{
        if(!error.CardNumber && values.CardNumber.length
            && !error.ExpDate && values.ExpDate.length
            && !error.Cvv && values.Cvv.length
            && !error.Amount && values.Amount.length
        ){
            setDisabled(false)
        }else {
            setDisabled(true)
        }
    }, [error])
    const OnFocus = (e)=>{
        setFocus({
            ...focus,
            [e.target.id]: true
        })
    }
    const Submit = (e)=>{
        e.preventDefault()
        let data = {...values, CardNumber: values.CardNumber.replace(/[^0-9]/g, '')}
        console.log(JSON.stringify(data))
    }
  return (
    <Container>
      <Head>
          <title>Card validation</title>
          <meta name="description" content="Generated by create next app"/>
          <link rel="icon" href="/favicon.ico"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>
      <main style={{height: '100vh'}}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Card sx={{maxWidth: 345}}>
                  <CardMedia
                      component="img"
                      image="/bank-card.jpg"
                      alt="Bank card"
                  />
                  <CardContent>
                      <Box
                          component="form"
                          vallidate
                          sx={{
                              width: 320,
                              maxWidth: '100%',
                          }}
                      >
                          <FormControl error={error.CardNumber} sx={{margin: 2, width: '100%', maxWidth: 260}}
                                       onFocus={OnFocus}>
                              <InputLabel htmlFor="CardNumber">Номер карты</InputLabel>
                              <OutlinedInput
                                  label={'Номер карты'}
                                  value={values.CardNumber}
                                  onChange={handleChange}
                                  name="CardNumber"
                                  id="CardNumber"
                                  inputComponent={TextMaskCustom}
                              />
                              <FormHelperText>Введите номер
                                  карты {values.CardNumber.replace(/[^0-9]/g, '').length}/16</FormHelperText>
                          </FormControl>
                          <FormControl error={error.ExpDate} sx={{margin: 2, width: '100%', maxWidth: 260}}
                                       onFocus={OnFocus}>
                              <InputLabel htmlFor="ExpDate">Срок действия</InputLabel>
                              <OutlinedInput
                                  label={'Срок действия'}
                                  value={values.ExpDate}
                                  onChange={handleChange}
                                  name="ExpDate"
                                  id="ExpDate"
                                  inputComponent={TextMaskCustom}
                              />
                              <FormHelperText>формат даты MM/YYYY</FormHelperText>
                          </FormControl>
                          <FormControl error={error.Cvv} sx={{margin: 2, width: '100%', maxWidth: 260}}
                                       onFocus={OnFocus}>
                              <InputLabel htmlFor="Cvv">CVV</InputLabel>
                              <OutlinedInput
                                  label={'CVV'}
                                  value={values.Cvv}
                                  onChange={handleChange}
                                  name="Cvv"
                                  id="Cvv"
                                  inputComponent={TextMaskCustom}
                              />
                              <FormHelperText>CVV {values.Cvv.length}/3</FormHelperText>
                          </FormControl>
                          <FormControl error={error.Amount} sx={{margin: 2, width: '100%', maxWidth: 260}}
                                       onFocus={OnFocus}>
                              <InputLabel htmlFor="Amount">Сумма</InputLabel>
                              <OutlinedInput
                                  label={'Сумма'}
                                  value={values.Amount}
                                  onChange={handleChange}
                                  name="Amount"
                                  id="Amount"
                                  inputComponent={TextMaskCustom}
                              />
                              <FormHelperText>Сумма</FormHelperText>
                          </FormControl>
                          <div style={{display: "flex", justifyContent: 'end', width: '260px'}}>
                              <Button variant="contained" disabled={Disabled} onClick={Submit}>Submit</Button>
                          </div>
                      </Box>

                  </CardContent>
              </Card>
          </Box>
      </main>
      <footer>
      </footer>
    </Container>
  )
}
