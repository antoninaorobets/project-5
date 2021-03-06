import { Grid, Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import BookToShare from './BookToShare'
import Container from '@mui/material/Container';
import BookForm from './BookForm'
import BooksControls from './BooksControls'
import {deleteBookApi} from '../api/bookApi'
import {getMyListApi} from '../api/listApi'
import {UserContext} from '../context/user'

function List() {
    const {user} = useContext(UserContext)
    const [list, setList] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editBook, SetEditBook] = useState({
        "title": "",
        "author": "",
        "description": ""
    })
    useEffect(() => {
        if (!user) return
        getMyListApi(user, onSuccessGetList) 
    }, [user])

    const onSuccessGetList = (data) => {
        setList(data)
        setLoading(false)
    }
    const onSuccessCreate =(book)=>{
        list.books = [...list.books,book]
        setList(list)
        setShowForm(false)
    }

    const onSuccessEdit = (editedBook)=>{
        setShowForm(false)        
        const updatedBookList = list.books.map((book,index) => {
            if (book.id === editedBook.id) {
                return editedBook 
            }
            return book  
        }) 
        list.books =updatedBookList
        setList(list)
    }

    const onSuccessDelete = (id)=>{
        const filteredList = list.books.filter(book => book.id !== id) 
        list.books = filteredList
        setList(list)

        setLoading(false)
    }
    const handleDelete =(id)=>{
        setLoading(true)
        deleteBookApi(user, id, onSuccessDelete)
    }

    const handleEditButton = (id) => {
        const book = list.books.find(book => book.id === id) 
        SetEditBook(book)
        setEditMode(true)
        setShowForm(true)
      }

    let booksList
    let ln
    if (!isLoading) {
        ln = list.books.length
        booksList = list.books.map(book => 
        <Grid item xs={12} sm={6} md={4} key={book.id}  >
            <BookToShare 
                book={book} 
                handleDelete={handleDelete} 
                handleEdit={handleEditButton}
                />
        </Grid>)
    }
    const link = `${window.location.protocol}//${window.location.host}/shared_list/${list.id}`
    return (
        <Container>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h4"
                        align="center"
                        color="text.primary"
                        gutterBottom
                        sx={{ mb: 4, color : "#5F5B5B" }}
                    >
                        Books you share
                    </Typography>
                    {ln === 0 
                        ? <Typography align="center" color="text.secondary" paragraph sx={{ marginBottom: 4}}> Please add books to share them with your friends </Typography>
                        : <Typography align="center" color="text.secondary" paragraph sx={{ marginBottom: 4}}>There are {ln} books on your list. Please copy the link and send it to your friend to share these books.
                            <Button
                                onClick={() => {
                                    console.log("coppied", link)
                                    navigator.clipboard.writeText(link)}}>
                                Copy share link
                            </Button>
                        </Typography>
                    }
                    <Container maxWidth="sm">
                        {showForm
                            ? <BookForm 
                                setShowForm={setShowForm} 
                                editBook={editBook} 
                                SetEditBook={SetEditBook}
                                editMode={editMode} 
                                setEditMode={setEditMode}
                                user={user} 
                                onSuccessCreate={onSuccessCreate}
                                onSuccessEdit={onSuccessEdit}
                               
                                />
                            : <BooksControls setShowForm={setShowForm}/>}
                    </Container>
                </Container>
            </Box>

            <Container sx={{ py: 4 }} maxWidth="md">
                <Grid container spacing={4}>
                    {booksList}
                </Grid>
            </Container>
        </Container>
    )
}

export default List