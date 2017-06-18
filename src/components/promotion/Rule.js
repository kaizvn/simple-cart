/**
 * Created by kainguyen on 6/17/17.
 */
import React, { Component } from 'react';
import './Rule.css';
import { observer } from 'mobx-react';
import * as _ from 'lodash';

const PromotionRule = observer(class PromotionRule extends Component {
    constructor(prop) {
      super(prop);
      this.state = {
        formData: {}
      }
    }

    componentWillMount() {
      this.doClear();
    }

    doSelectedPromo = (event) => {
      let id = event ? event.target.value : '';
      let data = this.props.data.getPromotion(id);
      this.setState({formData: data});
    };

    doClear = () => {
      this.doSelectedPromo();
    };

    getFormData = () => _.extend({}, this.state.formData);


    doUpdateForm = (event) => {
      let updated = this.props.data.doUpdatePromotion(this.getFormData());
      (!updated) && this.doClear();
      event.preventDefault();
    };

    doUpdateField(fields, event) {
      let formData = this.getFormData();

      fields.split('.').reduce((curr, next) => {
        return (typeof curr[next] === 'object')
          ? curr[next]
          : curr[next] = event.target.value;
      }, formData);

      this.setState({formData});
    };

    doUpdateCheckbox(fields, event) {
      let formData = this.getFormData();

      fields.split('.').reduce((curr, next) => {
        return (typeof curr[next] === 'object')
          ? curr[next]
          : curr[next] = event.target.checked;
      }, formData);

      this.setState({formData});
    }


    render() {
      const {promotionNameList} = this.props.data;
      const formData = this.state.formData;
      const renderOptions = promotionNameList.map(item => {
        return (<option key={item.id} value={item.id}>{item.name || '---' }</option>);
      });

      return (
        <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
          <p className="Rule-intro">
            this is rule component {this.props.data.promotion[1].group}
          </p>
          <form onSubmit={this.doUpdateForm}>
            <div className="form-group col-lg-12">
              <label>Select Promotion</label>
              <select className="form-control"
                      onChange={this.doSelectedPromo} value={formData.id}>
                {renderOptions}
              </select>
            </div>

            <div className="form-group col-lg-12">
              <label> Promotion name</label>
              <input type="text" className="form-control"
                     value={formData.name} onChange={this.doUpdateField.bind(this, 'name')} disabled={formData.id}
                     required/>
            </div>

            <div className="form-group col-lg-12">
              <label> Apply for group</label>
              <input type="text" className="form-control"
                     value={formData.group} onChange={this.doUpdateField.bind(this, 'group')} required/>
            </div>

            <div className="form-group col-lg-6">
              <label>Order package</label>
              <input type="text" className="form-control"
                     value={formData.condition.type} onChange={this.doUpdateField.bind(this, 'condition.type')} required/>
            </div>

            <div className="form-group col-lg-6">
              <label>Quantity</label>
              <input type="number" className="form-control"
                     value={formData.condition.quantity} onChange={this.doUpdateField.bind(this, 'condition.quantity')}
                     required/>
            </div>

            <div className="form-group col-lg-6">
              <label>Promotion type</label>
              <input type="text" className="form-control"
                     value={formData.promo.type} onChange={this.doUpdateField.bind(this, 'promo.type')} required/>
            </div>

            <div className="form-group col-lg-6">
              <label>Value</label>
              <input type="number" className="form-control"
                     value={formData.promo.value} onChange={this.doUpdateField.bind(this, 'promo.value')} required/>
            </div>

            <div className="checkbox col-lg-6">
              <label htmlFor="high-priority">
                <input type="checkbox" name="high-priority" className="checkbox"
                       checked={formData.isHighPriority}
                       onChange={this.doUpdateCheckbox.bind(this, 'isHighPriority')}/>
                High priority
              </label>

            </div>
            <div className="btn-block col-lg-6">
              <input type="button" value="Add new / Update" className="btn btn-info col-lg-5"
                     onClick={this.doUpdateForm}/>
              <input type="button" value="Clear" className="btn btn-default col-lg-5 col-lg-offset-2"
                     onClick={this.doClear}/>
            </div>
          </form>
        </div>
      );
    }
  })
;

export default PromotionRule;
