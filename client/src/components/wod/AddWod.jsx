import React, { Component } from 'react';
import { 
  reset, 
  reduxForm, 
  Field, 
  FieldArray,
  formValueSelector
} from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const typeEnum = ['time', 'emom', 'rounds', 'rft', 'amrap', 'reps', 'sets',  'cals', 'distance'];
const unitsEnum = ['ft', 'kg', 'lbs', 'm', 'km', 'mi'];
const sectionEnum = ['wod', 'skill', 'barbell', 'accessory', 'warmup'];


const MovementsMenu = ({ fields, meta: { error, submitFailed } }) => {
  return (
    <div>
      <label>Movements</label>
      <h1>{fields.length}</h1>
      {fields.map((movement, movementIndex) => (
        <div className='movement'>
          <button
            type="button"
            onClick={() => fields.remove(movementIndex)}
          >
            Remove Movement
          </button>
          <MeatAndPotatoes base={movement} key={movementIndex}/>
          <FieldArray 
            name={`${movement}.movements`} 
            component={MovementsMenu}
          />
        </div>
      ))}
      <button type="button" onClick={() => fields.push({})}>
        Add Movement
      </button>
    </div>
  )
};

const MeatAndPotatoes = ({base}) => {
  return (
    <div className='meatAndPotatoes'>
      <fieldset>
        <label>Type</label>
        <Field 
          name={base ? `${base}.type` : 'type'}
          type="text"
          component="select"
        >
          <option></option>
          {typeEnum.map(type => (
            <option value={type}>{type}</option>
          ))}
        </Field>
      </fieldset>
      <fieldset>
        <label>Movement</label>
        <Field
          name={base ? `${base}.movement` : 'movement'}
          type="text"
          component="input"
          autoComplete="none"
        />
      </fieldset>
      <fieldset>
        <label>Time</label>
        <Field
          name={base ? `${base}.time` : 'time'}
          type="text"
          component="input"
          autoComplete="none"
        />
      </fieldset>
      <fieldset>
        <label>Reps</label>
        <Field
          name={base ? `${base}.reps` : 'reps'}
          type="number"
          component="input"
          autoComplete="none"
        />
      </fieldset>
      <fieldset>
        <label>Sets</label>
        <Field
          name={base ? `${base}.sets` : 'sets'}
          type="number"
          component="input"
          autoComplete="none"
        />
      </fieldset>
      <fieldset>
        <label>Rounds</label>
        <Field
          name={base ? `${base}.rounds` : 'rounds'}
          type="number"
          component="input"
          autoComplete="none"
        />
      </fieldset>
      <fieldset>
        <label>Cals</label>
        <Field
          name={base ? `${base}.cals` : 'cals'}
          type="number"
          component="input"
          autoComplete="none"
        />
      </fieldset>
      <fieldset>
        <label>Distance</label>
        <Field
          name={base ? `${base}.distance` : 'distance'}
          type="number"
          component="input"
          autoComplete="none"
        />
      </fieldset>
      <fieldset>
        <label>Weight</label>
        <Field
          name={base ? `${base}.weight` : 'weight'}
          type="number"
          component="input"
          autoComplete="none"
        />
      </fieldset>
      <fieldset>
        <label>Units</label>
          <Field 
            name={base ? `${base}.units` : 'units'}
            type="text"
            component="select"
          >
          <option></option>
          {unitsEnum.map(unit => (
            <option value={unit}>{unit}</option>
          ))}
        </Field>
      </fieldset>
    </div>
  );
};

class AddWod extends Component {
  onSubmit = formProps => {
    this.props.addWod(formProps, err => {
      if(err){
        console.log(err);
        window.alert(err)
      }
    });
  };

  render() {
    const { handleSubmit, errorMessage } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Source</label>
          <Field
            name="source"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Section</label>
          <Field 
            name='section'
            type="text"
            component="select"
          >
            <option></option>
            {sectionEnum.map(section => (
              <option value={section}>{section}</option>
            ))}
         </Field>
        </fieldset>
        <fieldset>
          <label>Name</label>
          <Field
            name="name"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>

        <MeatAndPotatoes />
        
        <FieldArray 
          name="movements" 
          component={MovementsMenu}
        >
        </FieldArray>
        <div>{errorMessage}</div>
        <fieldset>
          <label>Notes</label>
          <Field
            name="notes"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <button id='saveWod'>Save this wod!</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { 
    errorMessage: state.auth.errorMessage,
    initialValues: {
      movements: []
    }
   };
}

const afterSubmit = (result, dispatch) => {
  console.log(result);
  dispatch(reset('addWod'));
};
const selector = formValueSelector('addWod')

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'addWod', onSubmitSuccess: afterSubmit })
)(AddWod);
