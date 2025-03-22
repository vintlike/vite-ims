import { styled } from '@/global';

export const MapLayout = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .map-head {
  }

  .map-content {
    position: relative;
    z-index: 8;
    display: flex;
  }

  .map-list {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    gap: 16px;
    .map-list-item {
      width: 100%;
      overflow: hidden;
      border: 1px solid #ddd;

      &.map-list-item-half {
        max-width: calc(50% - 8px);
      }
    }
  }

  .map-form {
    z-index: 9;
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    width: 300px;
    width: 100%;
    height: auto;
    padding: 10px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.6);
  }
  .ant-form {
    width: 100%;
    .ant-form-item {
      margin-bottom: 8px;
      margin-right: 8px;
      &.common-form-operate {
        flex: 0 0 auto;
      }
    }
  }

  .map-container {
    position: relative;
    display: flex;
    flex: 0 0 auto;
    width: 100%;
    height: 100%;
    min-width: 400px;
    min-height: 450px;
  }
`;
