import { message } from 'antd';

/**
 * 获取节点运行时样式
 *
 * @param node 节点
 * @param attr 节点属性
 * @returns
 */
export const getStyle = (node: any, attr: string) => {
  /**
   * Node.ELEMENT_NODE                   1    一个 元素 节点，例如 <p> 和 <div>。
   * Node.ATTRIBUTE_NODE                 2    元素 的耦合 属性。
   * Node.TEXT_NODE                      3    Element 或者 Attr 中实际的 文字
   * Node.CDATA_SECTION_NODE             4    一个 CDATASection，例如 <!CDATA[[ … ]]>。
   * Node.PROCESSING_INSTRUCTION_NODE    7    一个用于 XML 文档的 ProcessingInstruction (en-US) ，例如 <?xml-stylesheet ... ?> 声明。
   * Node.COMMENT_NODE                   8    一个 Comment 节点。
   * Node.DOCUMENT_NODE                  9    一个 Document 节点。
   * Node.DOCUMENT_TYPE_NODE             10    描述文档类型的 DocumentType 节点。例如 <!DOCTYPE html> 就是用于 HTML5 的。
   * Node.DOCUMENT_FRAGMENT_NODE         11    一个 DocumentFragment 节点
   */
  if (node && node.nodeType === 1) {
    if (node.currentStyle) {
      return node.currentStyle[attr];
    } else {
      return window.getComputedStyle(node, null)[attr as unknown as number];
    }
  }
};

export function getNodeText(elem: any) {
  let node;
  let ret = '';
  let i = 0;
  const nodeType = elem.nodeType;

  //如果selector是类的话，会有多个目标元素，此时需要分别单个循环
  //比如document.querySelectorAll('.divOne').nodeType ->undefined
  if (!nodeType) {
    while ((node = elem[i++])) {
      //单个获取
      ret += getNodeText(node);
    }
  }
  //元素节点，文档节点，文档碎片
  else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
    //如果目标元素的内容是文本，则直接返回
    if (typeof elem.textContent === 'string') {
      /*jQuery没有用innerText获取文本的值，http://bugs.jquery.com/ticket/11153，
          大概就是在IE8中新节点插入会保留所有回车。
          所以jQuery采用了textContent获取文本值，
          textContent本身是dom3规范的，可以兼容火狐下的innerText问题。*/
      return elem.textContent;
    }
    //如果节点内容不是文本，则循环子节点，并依次获取它们的文本节点
    else {
      for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
        ret += getNodeText(elem);
      }
    }
  }
  //文本节点、一个文档的CDATA部分（没遇到过这个）
  else if (nodeType === 3 || nodeType === 4) {
    //返回节点值
    return elem.nodeValue;
  }
  //nodeType：注释节点 8，处理指令 7
  //text()方法不处理这两个类型节点
  return ret;
}

/** 复制到剪切板 */
export default function copyTextToClipboard(text: string) {
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const oInput = document.createElement('input');
    oInput.value = text;
    oInput.setAttribute('readonly', '');
    oInput.style.position = 'absolute';
    oInput.style.left = '-9999px';
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand('Copy'); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display = 'none';
    oInput.remove();
  }
  message.success('复制成功');
}
