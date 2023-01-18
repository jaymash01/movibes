import React from "react";
import { Box, TextField as MuiTextField, Typography } from "@mui/material";

class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();

    this.state = {
      value: props.defaultValue,
      error: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  _onChange(value, validate = true) {
    if (this.props.valueFilter) {
      value = this.props.valueFilter(value);
    }

    if (this.props.onChange) {
      this.props.onChange(value, this.input);
    }

    this.setState({ value }, () => {
      if (validate) {
        this.validate();
      }
    });
  }

  validate() {
    let rules = this.props.rules || [], i = 0;
    if (this.props.required) {
      rules.unshift((value) => !!value || "This field is required.");
    }

    for (; i < rules.length; i++) {
      let validate = rules[i](this.state.value);
      if (validate !== true) {
        this.setState({ error: validate });
        return false;
      } else {
        this.setState({ error: undefined });
      }
    }

    return true;
  }

  setValue(value, validate = false) {
    this.input.value = value;
    this._onChange(value, validate);
  }

  render() {
    const { containerProps, label, required, horizontal, valueFilter, ...rest } = this.props;
    return (
      <Box
        component="div"
        {...(horizontal && {
          display: "flex",
          flexDirection: "row"
        })}
        {...containerProps}
      >
        {label ?
          <Typography
            sx={{
              ...(horizontal && {
                mr: 1,
              }),
              ...(!horizontal && {
                mb: 0.5,
              }),
            }}
          >
            {label}
            {required ?
              <Typography
                component="span"
                color="error.main"
                fontWeight="bold"
                ml={0.25}
              >
                *
              </Typography>
              : null
            }
          </Typography>
          : null
        }
        <Box
          component="div"
          {...(horizontal && {
            flexGrow: 1,
          })}
        >
          <MuiTextField
            inputRef={(ref) => this.input = ref}
            variant="outlined"
            size="small"
            margin="none"
            autoComplete="off"
            {...rest}
            required={required}
            error={!!this.state.error}
            onChange={(event) => this._onChange(event.target.value, true)}
          />
          {this.state.error ?
            <Typography
              variant="body2"
              sx={{
                color: "error.main",
                mt: 0.25,
              }}
            >
              {this.state.error}
            </Typography>
            : null
          }
        </Box>
      </Box>
    );
  }
}

export default TextField;
