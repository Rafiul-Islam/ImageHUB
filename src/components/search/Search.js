import React, {Component} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SearchIcon from "@material-ui/icons/Search";
import * as axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ImageResults from "../image-results/ImageResults";

class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        images: [],
        apiUrl: 'https://pixabay.com/api/',
        apiKey: ''
    }

    onTextChange = e => {
        const val = e.target.value;
        this.setState({[e.target.name]: val}, () => {
            if (val === '') {
                this.setState({images: []});
            } else {
                axios
                    .get(
                        `${this.state.apiUrl}?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`
                    )
                    .then(res => this.setState({images: res.data.hits}))
                    .catch(err => console.log(err));
            }
        });
    };
    onAmountChange = e => {
        const val = e.target.value;
        this.setState({[e.target.name]: val});
    }

    render() {
        const {searchText, amount, image} = this.state
        return (
            <div className='mt-3 mx-3'>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Search</InputLabel>
                    <OutlinedInput
                        name='searchText'
                        value={searchText}
                        onChange={this.onTextChange}
                        labelWidth={60}
                        placeholder='Search for images'
                        startAdornment={<SearchIcon/>}
                    />
                </FormControl>
                <FormControl fullWidth variant="outlined" className='mt-3'>
                    <InputLabel>Amount</InputLabel>
                    <Select
                        name='amount'
                        value={amount}
                        onChange={this.onAmountChange}
                        label="amount"
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
                <br />
                {this.state.images.length > 0 ? (
                    <ImageResults images={this.state.images} />
                ) : null}
            </div>
        );
    }
}

export default Search;
