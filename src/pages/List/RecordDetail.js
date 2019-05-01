import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Description } = DescriptionList;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class RecordDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { location } = this.props;
    const data = location.params || {};
    return (
      <PageHeaderWrapper title="基础详情页">
        <Card bordered={false}>
          <DescriptionList size="large" title="基础信息" style={{ marginBottom: 32 }}>
            <Description term="fullName">{data.fullName || ''}</Description>
            <Description term="email">{data.email || ''}</Description>
            <Description term="userCode">{data.userCode || ''}</Description>
            <Description term="userPhone">{data.userPhone || ''}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RecordDetail;
