const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  const fixes = [
    {
      id: "e83dd9ed-d5b6-46c9-9548-27e87a06e89c",
      solution: "Ta có $\\sqrt{0,04} = \\sqrt{0,2^2} = 0,2$. Vậy giá trị của biểu thức là $0,2$."
    },
    {
      id: "67c254b6-b6bc-4714-b4ba-9a98bba73101",
      solution: "Giá trị có tần số lớn nhất trong mẫu số liệu được gọi là mốt của mẫu số liệu đó, kí hiệu là $M_o$."
    },
    {
      id: "47274152-93b6-4864-8499-813960ed2a8f",
      solution: "Theo tính chất nhẩm nghiệm của định lí Viète, nếu phương trình $ax^2 + bx + c = 0$ ($a \\neq 0$) có $a+b+c=0$ thì phương trình luôn có một nghiệm là $x_1 = 1$ và nghiệm còn lại là $x_2 = \\dfrac{c}{a}$."
    },
    {
      id: "726e5153-211e-4053-87d3-0bcbb4cd6b6a",
      solution: "Giá trị đại diện của nhóm $[20; 30)$ được tính bằng trung bình cộng của hai đầu mút, ta có: $\\dfrac{20 + 30}{2} = 25$."
    },
    {
      id: "60b68003-f612-4e66-b739-9447e0bf742e",
      options: [
        { key: "A", value: "$(2; 1)$" },
        { key: "B", value: "$(1; 2)$" },
        { key: "C", value: "$(2; -1)$" },
        { key: "D", value: "$(-2; 1)$" }
      ],
      correct_answer: "A"
    },
    {
      id: "83f65484-9c7b-453e-8ec7-ee38a62e6444",
      solution: "Diện tích xung quanh của hình trụ được tính bằng chu vi đáy nhân với chiều cao, do đó công thức là $S_{xq} = 2\\pi r h$."
    },
    {
      id: "6421edc9-b183-4a11-8f6c-81c0228278da",
      solution: "Phép thử ngẫu nhiên là phép thử mà ta không thể đoán trước được kết quả của nó, mặc dù đã biết tập hợp tất cả các kết quả có thể xảy ra."
    },
    {
      id: "df61e3a7-617a-4327-91c9-eaaeaa1bc94e",
      solution: "Mỗi lần gieo xúc xắc có 6 khả năng xảy ra (từ 1 đến 6 chấm). Khi gieo 2 lần liên tiếp, số phần tử của không gian mẫu là $6 \\times 6 = 36$."
    },
    {
      id: "3b343084-9eed-43bb-a1d6-888a16799c1d",
      solution: "Tâm đường tròn bàng tiếp trong góc A của tam giác là giao điểm của đường phân giác trong góc A và hai đường phân giác ngoài tại các đỉnh B và C."
    },
    {
      id: "cd37f7f6-bc96-4809-9b81-eaf7998852aa",
      solution: "Trong tam giác ABC vuông tại A, theo định lý Pythagore ta luôn có hệ thức bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông: $BC^2 = AB^2 + AC^2$."
    },
    {
      id: "4dd0592b-5c06-4bbc-bb94-b3d8e48b5f55",
      options: [
        { key: "A", value: "$(3; 1)$" },
        { key: "B", value: "$(1; 3)$" },
        { key: "C", value: "$(3; -1)$" },
        { key: "D", value: "$(-3; 1)$" }
      ],
      correct_answer: "A"
    },
    {
      id: "0879d190-bef5-4527-833a-89d42a43e97f",
      options: [
        { key: "A", value: "$15$ và $10$" },
        { key: "B", value: "$20$ và $5$" },
        { key: "C", value: "$10$ và $15$" },
        { key: "D", value: "$25$ và $0$" }
      ],
      correct_answer: "A"
    },
    {
      id: "2dca4794-e4c0-48c1-b7cf-fc66f2068990",
      options: [
        { key: "A", value: "$3\\sqrt{3}$" },
        { key: "B", value: "$9\\sqrt{3}$" },
        { key: "C", value: "$\\sqrt{3}$" },
        { key: "D", value: "$3$" }
      ],
      correct_answer: "A"
    },
    {
      id: "b0a71841-61b5-4325-a695-9e2429e53774",
      options: [
        { key: "A", value: "$\\dfrac{1}{6}$" },
        { key: "B", value: "$\\dfrac{1}{2}$" },
        { key: "C", value: "$\\dfrac{1}{3}$" },
        { key: "D", value: "$1$" }
      ],
      correct_answer: "A"
    }
  ];

  for (const fix of fixes) {
    if (fix.solution) {
      await sql`UPDATE public.questions SET solution = ${fix.solution} WHERE id = ${fix.id}`;
    } else if (fix.options) {
      await sql`UPDATE public.questions SET options = ${JSON.stringify(fix.options)}, correct_answer = ${fix.correct_answer} WHERE id = ${fix.id}`;
    }
    console.log(`Đã sửa câu ID: ${fix.id}`);
  }
  
  console.log("Đã áp dụng các bản sửa lỗi trực tiếp cho 14 câu.");
})();
