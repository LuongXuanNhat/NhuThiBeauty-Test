// eslint/no-banned-words.js
export default {
  rules: {
    "no-banned-words": {
      meta: {
        type: "problem",
        docs: {
          description: "Disallow banned words and phrases in code",
          category: "Possible Errors",
        },
        fixable: null,
        schema: [],
      },

      create(context) {
        const bannedWords = [
          "an toàn",
          "cắt đứt",
          "chất lượng cao",
          "chặn đứng",
          "chữa bệnh",
          "chữa viêm da",
          "chuyên trị",
          "diệt nấm",
          "diệt virus",
          "dừng quá trình ra mồ hôi",
          "dừng sự phát triển của lông",
          "duy nhất",
          "dứt",
          "đảm bảo 100%",
          "bảo đảm 100%",
          "tự nhiên 100%",
          "cực kỳ",
          "đầu bảng",
          "đầu tay",
          "điều trị",
          "giảm béo",
          "giảm cân",
          "giảm kích thước",
          "giảm liền",
          "giảm mỡ",
          "giảm ngay",
          "giảm sẹo lồi",
          "giảm tức thì",
          "giảm dị ứng",
          "khỏi",
          "khỏi hẳn",
          "khỏi ngay",
          "kem trị nám, mỹ phẩm tự nhiên 100%",
          "kích thích mọc tóc",
          "làm sạch vết thương",
          "loại bỏ mỡ",
          "lựa chọn",
          "mọc lông mi",
          "mực xăm vĩnh viễn",
          "ngăn ngừa lông",
          // "nhất",
          "tiệt trừ",
          "tốt nhất",
          "trắng da cấp tốc",
          "trắng da siêu tốc",
          "trị mụn, trắng da thần tốc",
          "trị nám vĩnh viễn trong 7 ngày",
          "tuyệt hảo",
          "tuyệt vời",
        ];

        function checkText(node, text) {
          const lowerText = text.toLowerCase();

          for (const bannedWord of bannedWords) {
            if (lowerText.includes(bannedWord.toLowerCase())) {
              context.report({
                node,
                message: `Từ cấm được phát hiện: "${bannedWord}". Vui lòng thay thế bằng từ khác.`,
              });
            }
          }
        }

        return {
          Literal(node) {
            if (typeof node.value === "string") {
              checkText(node, node.value);
            }
          },
          TemplateElement(node) {
            if (node.value?.raw) {
              checkText(node, node.value.raw);
            }
          },
          JSXText(node) {
            checkText(node, node.value);
          },
          JSXAttribute(node) {
            if (
              node.value &&
              node.value.type === "Literal" &&
              typeof node.value.value === "string"
            ) {
              checkText(node.value, node.value.value);
            }
          },
        };
      },
    },
  },
};
