// @/utils/blogDataSource.ts

import { Blog } from "@/model/blog";

import blog1a from "@/assets/blogs/1/473708376_122132918660545409_9103638148811620984_n.jpg";
import blog1b from "@/assets/blogs/1/474585068_122133407078545409_3111072117019857680_n.jpg";

import blog2a from "@/assets/blogs/2/06_25_a5.jpg";
import blog2b from "@/assets/blogs/2/06_25_a6.jpg";

import blog3a from "@/assets/blogs/3/06_25_a2.webp";
import blog3b from "@/assets/blogs/3/06_25_a4.jpg";

import blog4a from "@/assets/blogs/4/06_25_a3.jpg";

import blog5a from "@/assets/blogs/5/06_25_a1.jpg";

import blog6a from "@/assets/blogs/6/06_25_a7.webp";
import blog6b from "@/assets/blogs/6/06_25_a8.webp";

import blog7b from "@/assets/blogs/7/06_25_a10.webp";
import blog7a from "@/assets/blogs/7/06_25_a9.webp";

import blog8a from "@/assets/blogs/8/06_25_a11.jpg";
import blog8b from "@/assets/blogs/8/06_25_a12.jpg";

import blog9a from "@/assets/blogs/9/06_25_a13.webp";
import blog9b from "@/assets/blogs/9/06_25_a14.jpg";

import blog10a from "@/assets/blogs/10/06_25_a15.webp";
import blog10b from "@/assets/blogs/10/06_25_a16.webp";

export const blogDataSource: Blog[] = [
  {
    id: 1,
    title: "Lợi ích của massage thư giãn đối với sức khỏe",
    subTitle:
      "Khám phá cách massage giúp giảm căng thẳng và cải thiện giấc ngủ",
    content: `
      <div class="text-gray-800 leading-relaxed text-justify">
        <p class="mb-4">
          <strong>Massage thư giãn</strong> là một trong những phương pháp chăm sóc sức khỏe và làm đẹp được ưa chuộng nhất hiện nay. Không chỉ mang lại cảm giác dễ chịu và thư thái, massage còn có tác động sâu đến <strong>sức khỏe thể chất và tinh thần</strong>. Khi được thực hiện đúng cách, liệu pháp này giúp <strong>giảm căng thẳng</strong>, hỗ trợ <strong>lưu thông máu</strong> tốt hơn và nâng cao <strong>chất lượng giấc ngủ</strong>.
        </p>
        <p class="mb-4">
          Trong cuộc sống hiện đại, con người phải đối mặt với nhiều áp lực từ công việc, học tập và các mối quan hệ xã hội. Việc chịu đựng áp lực trong thời gian dài khiến cơ thể rơi vào trạng thái <strong>mệt mỏi kéo dài</strong>, đau nhức cơ, khó ngủ và dễ bị stress. Massage thư giãn, đặc biệt là các kỹ thuật như <strong>massage Thụy Điển</strong>, <strong>massage đá nóng</strong>, hay <strong>aromatherapy</strong> (liệu pháp tinh dầu), có thể giúp giải tỏa những áp lực đó một cách tự nhiên.
        </p>
        <p class="mb-4">
          Một trong những lợi ích nổi bật của massage là khả năng <strong>kích thích hệ thần kinh</strong> và làm dịu tâm trí. Việc xoa bóp các vùng cơ bị căng cứng sẽ làm giảm sự tích tụ của <strong>acid lactic</strong> và các độc tố trong cơ thể, giúp bạn cảm thấy <strong>sảng khoái</strong> và dễ chịu hơn. Ngoài ra, massage còn làm tăng sản sinh các hormone như <strong>endorphin</strong> và <strong>serotonin</strong> – hai chất dẫn truyền thần kinh giúp cải thiện tâm trạng và giảm lo âu.
        </p>
        <p class="mb-4">
          Không dừng lại ở đó, massage còn có tác dụng tích cực đến <strong>hệ miễn dịch</strong> bằng cách thúc đẩy <strong>tuần hoàn bạch huyết</strong>, giúp loại bỏ độc tố ra ngoài cơ thể. Đối với những người thường xuyên làm việc văn phòng, ít vận động, massage giúp cải thiện <strong>tư thế cơ thể</strong>, giảm đau cổ vai gáy và ngăn ngừa các vấn đề về cột sống.
        </p>
        <p class="mb-4">
          Đặc biệt, trong các spa hiện đại, massage thư giãn thường đi kèm với không gian yên tĩnh, âm nhạc nhẹ nhàng và mùi hương tinh dầu dễ chịu, giúp bạn <strong>thư giãn toàn diện</strong>. Đây là nơi lý tưởng dành cho những ai muốn tìm lại sự cân bằng trong cuộc sống bận rộn.
        </p>
        <p>
          Nếu bạn đang cảm thấy căng thẳng, mất ngủ hay đau mỏi cơ thể, đừng ngần ngại dành cho mình một buổi <strong>trị liệu massage</strong> chuyên nghiệp. Chỉ cần 60 phút thư giãn, bạn sẽ cảm nhận được sự khác biệt rõ rệt cả về <strong>tinh thần</strong> lẫn <strong>sức khỏe</strong>.
        </p>
      </div>
    `,
    date: new Date("2024-06-15"),
    images: [blog1a, blog1b],
  },
  {
    id: 2,
    title: "5 bước chăm sóc da mặt đúng cách tại spa",
    subTitle: "Từ làm sạch đến dưỡng ẩm – quy trình chuẩn không thể bỏ qua",
    content: `
    <div class="text-gray-800 leading-relaxed text-justify">
      <p class="mb-4"><strong>Bước 1. Tẩy trang chuyên sâu</strong>: Đầu tiên, bạn cần loại bỏ hoàn toàn lớp trang điểm, bụi bẩn và dầu thừa trên da. Spa sử dụng các loại dầu tẩy trang hoặc nước micellar oil-free kết hợp massage nhẹ nhàng giúp lỗ chân lông thông thoáng — là bước nền cho các bước sau.</p>
      <p class="mb-4"><strong>Bước 2. Rửa mặt 2 lần (double cleanse)</strong>: Tiếp theo là bước rửa mặt dịu nhẹ với sản phẩm dạng gel hoặc foam chứa AHA/BHA nhẹ, giúp loại bỏ sâu chất bẩn và tế bào chết một cách an toàn mà vẫn giữ độ ẩm tự nhiên.</p>
      <p class="mb-4"><strong>Bước 3. Tẩy tế bào chết định kỳ</strong>: Spa thường sử dụng enzyme hoặc tẩy da chết hóa học nhẹ nhàng như AHA để loại bỏ tế bào chết già, hỗ trợ da tái tạo tươi sáng. Bạn sẽ cảm nhận ngay da mịn màng, sáng bóng sau vài lần thực hiện.</p>
      <p class="mb-4"><strong>Bước 4. Đắp mặt nạ chuyên sâu</strong>: Da được cấp ẩm và nuôi dưỡng với các loại mặt nạ dưỡng chuyên biệt như mask dưỡng trắng, mask cấp ẩm hay mask phục hồi da nhạy cảm. Thời gian đắp từ 15–20 phút, kết hợp massage cổ vai giúp thư giãn toàn diện.</p>
      <p class="mb-4"><strong>Bước 5. Dưỡng ẩm và bảo vệ da</strong>: Cuối cùng, chuyên viên spa sẽ apply serum, kem dưỡng và kem chống nắng phù hợp với loại da của bạn. Đây là bước then chốt giúp duy trì độ ẩm, tăng khả năng bảo vệ da khỏi gốc tự do.</p>
      <p class="mb-4"><strong>Ưu điểm khi làm tại spa:</strong></p>
      <ul class="list-disc ml-6 mb-4">
        <li>Giải phóng thư giãn, giảm stress nhờ massage kết hợp âm nhạc/ánh sáng dịu nhẹ.</li>
        <li>Sản phẩm chuyên sâu, nồng độ cao – hiệu quả rõ rệt hơn so với khi tự thực hiện ở nhà.</li>
        <li>Kỹ thuật viên có kinh nghiệm giúp kiểm tra và đánh giá da, đưa ra phác đồ phù hợp.</li>
      </ul>
      <p class="mb-4"><strong>Lưu ý:</strong> Sau khi chăm sóc, nên tránh nắng, đeo khẩu trang và dùng kem chống nắng phổ rộng SPF ≥30. Không thực hiện các thủ thuật xâm lấn như lăn kim hoặc peel mạnh ngay sau đó để tránh kích ứng.</p>
      <p class="mb-4"><strong>Chu kỳ tối ưu:</strong> Để duy trì làn da khỏe đẹp, bạn nên đi spa chăm sóc da mặt chuyên nghiệp 1–2 tuần/lần tùy tình trạng da. Các bạn da dầu, mụn có thể đến 2 lần/tuần; da khô, nhạy cảm nên 1 lần/tuần.</p>
      <p class="mb-0">Với quy trình bài bản, sản phẩm chuyên sâu và kỹ thuật viên chuyên nghiệp, mình tin rằng buổi chăm sóc da tại spa sẽ mang lại cho bạn làn da rạng rỡ, tự tin, đồng thời là liều thuốc tinh thần tuyệt vời giữa bộn bề cuộc sống.</p>
    </div>
    `,
    date: new Date("2024-05-30"),
    images: [blog2a, blog2b],
  },
  {
    id: 3,
    title: "Công nghệ trẻ hóa da bằng ánh sáng sinh học",
    subTitle: null,
    content: `
    <div class="text-gray-800 leading-relaxed text-justify">
      <p class="mb-4"><strong>Công nghệ ánh sáng sinh học</strong> – hay còn gọi là <em>Photobiomodulation</em> – được đánh giá là bước tiến hiện đại giúp trẻ hóa da mà không xâm lấn. Bằng cách sử dụng các bước sóng đỏ, hồng ngoại và cả tia xanh, liệu pháp này tác động sâu vào tế bào da, hỗ trợ phục hồi và tái sinh collagen, elastin tự nhiên.</p>
      <p class="mb-4"><strong>Cách hoạt động:</strong> Ánh sáng đỏ (600–700 nm) – kích thích tế bào da tái tạo; ánh sáng hồng ngoại (780–1200 nm) – tăng tuần hoàn máu; ánh sáng xanh (415 nm) – kháng khuẩn, hỗ trợ trị mụn. Thiết bị điều chỉnh chế độ phù hợp giúp liệu pháp linh hoạt với nhiều vấn đề da.</p>
      <p class="mb-4"><strong>Lợi ích nổi bật:</strong></p>
      <ul class="list-disc ml-6 mb-4">
        <li>Kích thích collagen và elastin, làm đầy nếp nhăn, da căng mịn tự nhiên.</li>
        <li>Giảm mẩn đỏ, viêm nhiễm và kiểm soát dầu nhờ ánh sáng xanh kháng khuẩn.</li>
        <li>Thúc đẩy tuần hoàn máu, giúp da hồng hào và da non hồi phục nhanh.</li>
        <li>An toàn cho thai phụ, da nhạy cảm, không gây nóng rát hay tổn thương da.</li>
      </ul>
      <p class="mb-4"><strong>Quy trình chuẩn tại spa:</strong> Sau bước làm sạch và tẩy tế bào chết nhẹ, da được chiếu ánh sáng trong 15–20 phút. Thiết bị sẽ tự động điều chỉnh năng lượng phù hợp, quá trình này hoàn toàn thoải mái, không đau và có thể kết hợp với serum để tăng hiệu quả.</p>
      <p class="mb-4"><strong>Tần suất tối ưu:</strong> Thông thường thực hiện 8–12 buổi, 1–2 buổi/tuần, sau đó duy trì 1 buổi/tháng. Bạn sẽ thấy da săn khỏe, ít mụn hơn và nếp nhăn mờ dần chỉ sau 4–6 buổi.</p>
      <p class="mb-4"><strong>Lưu ý:</strong> Trước khi làm nên test da nhẹ, tránh dùng retinol hoặc trị liệu laser ngay trước đó để giảm kích ứng. Sau liệu trình cần chăm sóc tại nhà với kem dưỡng giàu peptide, chống nắng phổ rộng SPF ≥30.</p>
      <p class="mb-0">Công nghệ ánh sáng sinh học là lựa chọn lý tưởng cho ai muốn trẻ hóa da an toàn, không downtime. Hãy thử trải nghiệm tại spa uy tín và cảm nhận làn da tươi trẻ, rạng ngời từ sâu bên trong!</p>
    </div>
    `,
    date: new Date("2024-07-05"),
    images: [blog3a, blog3b],
  },
  {
    id: 4,
    title: "Tại sao bạn nên thử trị liệu đá nóng ít nhất một lần?",
    subTitle: "Trải nghiệm thư giãn sảng khoái cho cả cơ thể và tâm trí",
    content: `
    <div class="text-gray-800 leading-relaxed text-justify">
      <p class="mb-4"><strong>Trị liệu đá nóng (Hot Stone Massage)</strong> là kỹ thuật kết hợp giữa massage và đá bazan nung nóng, giúp thư giãn sâu cả về thể chất và tinh thần. Phương pháp này ngày càng phổ biến ở các spa cao cấp nhờ hiệu quả vượt trội trong việc giảm stress và kích hoạt năng lượng tích cực.</p>
      <p class="mb-4"><strong>Cách thức thực hiện:</strong> Đá bazan được làm nóng ở nhiệt độ 45–50°C, sau đó được đặt lên các huyệt đạo trên cơ thể như lưng, vai, phần dưới cổ, lòng bàn tay và gan bàn chân. Chuyên viên kết hợp đẩy nhẹ và nhấn bóp giúp nhiệt lan tỏa, làm giãn cơ và thúc đẩy tuần hoàn máu.</p>
      <p class="mb-4"><strong>Tác dụng nổi bật:</strong></p>
      <ul class="list-disc ml-6 mb-4">
        <li>Giảm căng cơ sâu, đặc biệt với người thường xuyên mệt mỏi, đau cổ vai gáy.</li>
        <li>Cải thiện lưu thông máu và bạch huyết, hỗ trợ đào thải độc tố hiệu quả.</li>
        <li>Làm dịu hệ thần kinh trung ương, giúp ngủ ngon và giảm stress nhanh.</li>
        <li>Thúc đẩy thư giãn toàn diện, kết hợp với liệu pháp tinh dầu giúp tăng trải nghiệm thăng hoa.</li>
      </ul>
      <p class="mb-4"><strong>Ai nên thử?</strong>:</p>
      <ul class="list-disc ml-6 mb-4">
        <li>Người văn phòng, ít vận động, hay cảm thấy mệt mỏi, căng thẳng cơ.</li>
        <li>Người mất ngủ, suy nhược thần kinh, cần thư giãn sâu.</li>
        <li>Da và cơ dẻo hơn, linh hoạt hơn sau mỗi buổi trị liệu.</li>
      </ul>
      <p class="mb-4"><strong>Lưu ý an toàn:</strong> Không áp dụng nếu bạn đang sốt, huyết áp cao, hoặc có các vấn đề về da mẫn cảm. Luôn kiểm tra nhiệt độ đá kỹ lưỡng và chọn cơ sở spa uy tín, đủ điều kiện trang bị.</p>
      <p class="mb-0">Chỉ một lần trải nghiệm, bạn sẽ cảm nhận cơ thể nhẹ nhàng, tinh thần thư thái, như “tái sinh” sau thời gian căng thẳng. Hãy đặt một buổi trị liệu đá nóng và tận hưởng sự khác biệt!</p>
    </div>
    `,
    date: new Date("2024-06-22"),
    images: [blog4a],
  },
  {
    id: 5,
    title: "Xu hướng làm đẹp tự nhiên lên ngôi",
    subTitle: "Tối giản nhưng hiệu quả – bí quyết giữ gìn vẻ đẹp bền vững",
    content: `
    <div class="text-gray-800 leading-relaxed text-justify">
      <p class="mb-4"><strong>Làm đẹp tự nhiên</strong> – thiên hướng lựa chọn nguyên liệu từ thiên nhiên như dầu dừa, nha đam, trà xanh, nghệ… đang trở thành trào lưu không chỉ ở spa mà còn trong chăm sóc tại nhà. Đây là giải pháp tối ưu cho các bạn theo đuổi lối sống lành mạnh, hạn chế hóa chất.</p>
      <p class="mb-4"><strong>Tại sao lại hấp dẫn?</strong></p>
      <ul class="list-disc ml-6 mb-4">
        <li>Ít kích ứng, phù hợp với da nhạy cảm, da mụn.</li>
        <li>Thân thiện với môi trường, đa phần là hữu cơ, có thể phân hủy sinh học.</li>
        <li>Giá thành hợp lý, dễ tìm, dễ tự làm và kiểm soát nguồn gốc rõ ràng.</li>
      </ul>
      <p class="mb-4"><strong>Công thức gợi ý tại spa hoặc DIY:</strong></p>
      <ul class="list-disc ml-6 mb-4">
        <li><strong>Mặt nạ nha đam + mật ong:</strong> dưỡng ẩm sâu, làm dịu kích ứng, phù hợp quanh năm.</li>
        <li><strong>Tẩy tế bào chết dầu dừa + đường nâu:</strong> nhẹ nhàng làm sạch, giữ ẩm, kích thích tái tạo.</li>
        <li><strong>Mặt nạ trà xanh + sữa chua:</strong> kháng viêm, làm sáng da, ngừa mụn hiệu quả.</li>
      </ul>
      <p class="mb-4"><strong>Ưu điểm khi dùng nguyên liệu thiên nhiên tại spa:</strong></p>
      <ul class="list-disc ml-6 mb-4">
        <li>Sản phẩm được kiểm nghiệm và pha chế chuẩn tỉ lệ, đảm bảo an toàn và hiệu quả.</li>
        <li>Được kết hợp với kỹ thuật massage giúp dưỡng chất thẩm thấu sâu hơn.</li>
        <li>Spa còn bổ sung các quy trình như xông mặt, chiếu ánh sáng sinh học để nâng tầm hiệu quả.</li>
      </ul>
      <p class="mb-4"><strong>Lưu ý:</strong> Luôn kiểm tra thử nghiệm nhỏ trên da, tránh dùng nguyên liệu có nguồn gốc không rõ ràng. Không dùng tinh dầu mạnh với da nhạy cảm hoặc phụ nữ mang thai nếu không có tư vấn.</p>
      <p class="mb-0">Xu hướng làm đẹp tự nhiên đang ngày càng lên ngôi vì sự đơn giản, hiệu quả và bền vững. Dù tại spa hay tại nhà, bạn vẫn có thể lựa chọn cách chăm sóc lành mạnh, thân thiện mà lại đem lại vẻ đẹp lâu dài.</p>
    </div>
    `,
    date: new Date("2024-07-18"),
    images: [blog5a],
  },
  {
    id: 6,
    title: "Cách chăm sóc da mặt mùa đông để luôn mềm mại và rạng rỡ",
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="text-gray-700 leading-relaxed mb-6">
          Mùa đông mang đến thời tiết khô lạnh, khiến làn da dễ bị mất nước, bong tróc và xỉn màu. Để giữ cho làn da luôn mềm mại, rạng rỡ trong những ngày đông lạnh giá, bạn cần điều chỉnh chu trình chăm sóc da phù hợp.
        </p>
        
        <div class="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
          <h3 class="text-lg font-semibold text-blue-800 mb-3">Bước 1: Làm sạch nhẹ nhàng</h3>
          <p class="text-blue-700">
            Ưu tiên sử dụng sữa rửa mặt dịu nhẹ, không chứa sulfate để tránh làm khô da. Sau bước làm sạch, việc sử dụng toner dưỡng ẩm giúp cân bằng độ pH và chuẩn bị cho da hấp thụ dưỡng chất tốt hơn.
          </p>
        </div>

        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
          <h3 class="text-lg font-semibold text-green-800 mb-3">Bước 2: Cấp ẩm sâu</h3>
          <p class="text-green-700">
            Sử dụng serum chứa <span class="font-medium">hyaluronic acid</span> hoặc <span class="font-medium">vitamin B5</span> để cấp nước sâu cho da. Chọn kem dưỡng có kết cấu dày hơn bình thường, giàu dưỡng chất như ceramide, shea butter hoặc squalane để khóa ẩm và bảo vệ hàng rào tự nhiên của da.
          </p>
        </div>

        <div class="bg-purple-50 border-l-4 border-purple-400 p-6 mb-6">
          <h3 class="text-lg font-semibold text-purple-800 mb-3">Bước 3: Chăm sóc đặc biệt</h3>
          <p class="text-purple-700">
            Sử dụng mặt nạ ngủ 2-3 lần mỗi tuần sẽ giúp bổ sung độ ẩm cho da trong suốt đêm.
          </p>
        </div>

        <div class="bg-amber-50 p-6 rounded-lg mb-6">
          <h3 class="text-lg font-semibold text-amber-800 mb-3 flex items-center">
            <span class="text-2xl mr-2">💡</span>
            Mẹo hiệu quả
          </h3>
          <ul class="text-amber-700 space-y-2">
            <li class="flex items-start">
              <span class="text-amber-500 mr-2">•</span>
              Dùng máy tạo độ ẩm trong phòng ngủ, đặc biệt vào ban đêm
            </li>
            <li class="flex items-start">
              <span class="text-amber-500 mr-2">•</span>
              Sử dụng kem chống nắng vẫn là điều bắt buộc để bảo vệ da khỏi tia UVA/UVB
            </li>
          </ul>
        </div>

        <div class="bg-gradient-to-r from-pink-100 to-rose-100 p-6 rounded-lg">
          <p class="text-rose-800 font-medium text-center">
            Chỉ cần kiên trì và lắng nghe làn da của bạn, bạn sẽ cảm nhận được sự khác biệt rõ rệt: da căng mọng, đều màu và tràn đầy sức sống suốt mùa đông.
          </p>
        </div>
      </div>
    `,
    subTitle: "Giữ làn da luôn căng mọng, mềm mại trong những ngày giá lạnh",
    date: new Date("2025-01-12"),
    images: [blog6a, blog6b],
  },
  {
    id: 7,
    title: "5 bước chăm sóc tóc khô xơ trở nên mềm mượt tự nhiên",
    subTitle: "Hướng dẫn chi tiết giúp mái tóc phục hồi, mềm mượt như salon",
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="text-gray-700 leading-relaxed mb-6">
          Tóc khô xơ là nỗi ám ảnh của nhiều chị em, đặc biệt khi phải tiếp xúc thường xuyên với hóa chất, nhiệt độ cao hoặc ánh nắng gay gắt. Tuy nhiên, chỉ cần áp dụng đúng quy trình chăm sóc, mái tóc có thể phục hồi độ bóng khỏe, mềm mượt tự nhiên.
        </p>

        <div class="space-y-6">
          <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 class="text-xl font-bold text-blue-800 mb-3 flex items-center">
              <span class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
              Làm sạch nhẹ nhàng
            </h3>
            <p class="text-blue-700">
              Sử dụng dầu gội không sulfate, ưu tiên sản phẩm chứa <span class="font-semibold">dầu argan, keratin hoặc tinh dầu bưởi</span> để cung cấp dưỡng chất thiết yếu. Gội đầu bằng nước mát hoặc ấm nhẹ để không làm mất đi độ ẩm tự nhiên của tóc.
            </p>
          </div>

          <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h3 class="text-xl font-bold text-green-800 mb-3 flex items-center">
              <span class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
              Dưỡng ẩm chuyên sâu
            </h3>
            <p class="text-green-700">
              Sử dụng dầu xả phục hồi chuyên sâu sau mỗi lần gội, tập trung nhiều vào phần ngọn tóc. Để dầu xả lưu lại <span class="bg-green-200 px-2 py-1 rounded">3–5 phút</span> trước khi xả sạch để tăng hiệu quả dưỡng ẩm.
            </p>
          </div>

          <div class="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
            <h3 class="text-xl font-bold text-purple-800 mb-3 flex items-center">
              <span class="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
              Khóa ẩm với tinh dầu
            </h3>
            <p class="text-purple-700">
              Thoa tinh dầu dưỡng tóc khi tóc còn ẩm để giúp khóa ẩm và giảm tình trạng xơ rối. Các loại dầu như <span class="font-semibold">dầu dừa, dầu hạt nho, hoặc dầu jojoba</span> là lựa chọn lý tưởng.
            </p>
          </div>

          <div class="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <h3 class="text-xl font-bold text-orange-800 mb-3 flex items-center">
              <span class="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
              Bảo vệ khỏi nhiệt độ cao
            </h3>
            <p class="text-orange-700">
              Hạn chế sử dụng máy sấy ở nhiệt độ cao. Nếu cần tạo kiểu, hãy dùng thêm <span class="bg-orange-200 px-2 py-1 rounded">xịt bảo vệ nhiệt</span> để tránh hư tổn.
            </p>
          </div>

          <div class="bg-pink-50 border-l-4 border-pink-500 p-6 rounded-r-lg">
            <h3 class="text-xl font-bold text-pink-800 mb-3 flex items-center">
              <span class="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
              Ủ tóc định kỳ
            </h3>
            <p class="text-pink-700">
              Ủ tóc <span class="bg-pink-200 px-2 py-1 rounded">1–2 lần/tuần</span> với mặt nạ ủ tự nhiên như chuối nghiền, mật ong, dầu oliu hoặc sản phẩm chuyên dụng chứa protein tái tạo.
            </p>
          </div>
        </div>

        <div class="bg-gradient-to-r from-rose-100 to-pink-100 p-6 rounded-lg mt-8">
          <p class="text-rose-800 font-medium text-center">
            Kiên trì chăm sóc với 5 bước trên, bạn sẽ sớm cảm nhận được sự khác biệt: tóc suôn mượt, óng ả và khỏe mạnh từ trong ra ngoài.
          </p>
        </div>
      </div>
    `,
    date: new Date("2025-01-20"),
    images: [blog7a, blog7b],
  },
  {
    id: 8,
    title: "Tại sao nên tẩy da chết toàn thân mỗi tuần?",
    subTitle: "Lợi ích tuyệt vời của việc tẩy da chết đều đặn",
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="text-gray-700 leading-relaxed mb-6">
          Tẩy da chết toàn thân là một trong những bước quan trọng giúp duy trì làn da mịn màng, sáng khỏe mà nhiều người thường bỏ qua. Hằng ngày, da chúng ta sản sinh tế bào mới và loại bỏ tế bào cũ, tuy nhiên, nếu không được làm sạch đúng cách, các lớp tế bào chết sẽ tích tụ gây nhiều vấn đề.
        </p>

        <div class="bg-red-50 border-2 border-red-200 p-6 rounded-lg mb-6">
          <h3 class="text-lg font-semibold text-red-800 mb-3 flex items-center">
            <span class="text-2xl mr-2">⚠️</span>
            Tác hại khi không tẩy da chết
          </h3>
          <ul class="text-red-700 space-y-2">
            <li class="flex items-start">
              <span class="text-red-500 mr-2">•</span>
              Tắc nghẽn lỗ chân lông
            </li>
            <li class="flex items-start">
              <span class="text-red-500 mr-2">•</span>
              Da xỉn màu, sần sùi
            </li>
            <li class="flex items-start">
              <span class="text-red-500 mr-2">•</span>
              Mụn ở lưng, vai hoặc ngực
            </li>
          </ul>
        </div>

        <div class="bg-green-50 border-2 border-green-200 p-6 rounded-lg mb-6">
          <h3 class="text-lg font-semibold text-green-800 mb-3 flex items-center">
            <span class="text-2xl mr-2">✨</span>
            Lợi ích của việc tẩy da chết
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h4 class="font-semibold text-green-700 mb-2">Tái tạo da</h4>
              <p class="text-green-600 text-sm">Loại bỏ lớp sừng già, kích thích tái tạo tế bào mới</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h4 class="font-semibold text-green-700 mb-2">Tăng hấp thụ</h4>
              <p class="text-green-600 text-sm">Tăng hiệu quả hấp thụ kem dưỡng, body lotion</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h4 class="font-semibold text-green-700 mb-2">Lưu thông máu</h4>
              <p class="text-green-600 text-sm">Massage kích thích lưu thông máu, thư giãn</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h4 class="font-semibold text-green-700 mb-2">Tăng đàn hồi</h4>
              <p class="text-green-600 text-sm">Cải thiện độ đàn hồi và mềm mại của da</p>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 class="text-lg font-semibold text-blue-800 mb-4">Lựa chọn sản phẩm tẩy da chết</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white p-4 rounded-lg border-l-4 border-blue-400">
              <h4 class="font-semibold text-blue-700 mb-2">Tẩy da chết vật lý</h4>
              <p class="text-blue-600 text-sm mb-2">Scrub chứa hạt mịn từ:</p>
              <ul class="text-blue-600 text-sm space-y-1">
                <li>• Cà phê</li>
                <li>• Yến mạch</li>
                <li>• Muối biển</li>
              </ul>
            </div>
            <div class="bg-white p-4 rounded-lg border-l-4 border-purple-400">
              <h4 class="font-semibold text-purple-700 mb-2">Tẩy da chết hóa học</h4>
              <p class="text-purple-600 text-sm mb-2">Dịu nhẹ cho da nhạy cảm:</p>
              <ul class="text-purple-600 text-sm space-y-1">
                <li>• AHA (Alpha Hydroxy Acid)</li>
                <li>• BHA (Beta Hydroxy Acid)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-amber-50 border-l-4 border-amber-400 p-6 mb-6">
          <h3 class="text-lg font-semibold text-amber-800 mb-3">Tần suất sử dụng</h3>
          <p class="text-amber-700">
            Thực hiện <span class="bg-amber-200 px-2 py-1 rounded font-semibold">1–2 lần/tuần</span> để đảm bảo làn da luôn trong trạng thái sạch sẽ và tươi mới.
          </p>
        </div>

        <div class="bg-rose-50 p-6 rounded-lg mb-6">
          <h3 class="text-lg font-semibold text-rose-800 mb-3 flex items-center">
            <span class="text-2xl mr-2">💡</span>
            Lưu ý quan trọng
          </h3>
          <p class="text-rose-700">
            Sau khi tẩy da chết, đừng quên <span class="font-semibold">dưỡng ẩm ngay</span> để khóa ẩm và phục hồi hàng rào bảo vệ da.
          </p>
        </div>

        <div class="bg-gradient-to-r from-pink-100 to-rose-100 p-6 rounded-lg">
          <p class="text-rose-800 font-medium text-center">
            Một làn da mịn màng, đều màu không chỉ giúp bạn cảm thấy tự tin hơn mà còn hỗ trợ tốt cho các liệu trình làm đẹp khác.
          </p>
        </div>
      </div>
    `,
    date: new Date("2025-01-28"),
    images: [blog8a, blog8b],
  },
  {
    id: 9,
    title: "Massage mặt đúng cách: Bí quyết giúp da săn chắc và chống lão hóa",
    subTitle:
      "Thực hiện đúng kỹ thuật massage để ngăn ngừa chảy xệ và nếp nhăn",
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="text-gray-700 leading-relaxed mb-6">
          Massage mặt không chỉ giúp thư giãn mà còn là một trong những phương pháp tự nhiên hiệu quả trong việc chống lão hóa và cải thiện độ săn chắc của làn da. Khi được thực hiện đúng cách, massage mặt kích thích lưu thông máu, thúc đẩy quá trình sản sinh collagen và làm sáng da một cách tự nhiên.
        </p>

        <div class="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg mb-6">
          <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <span class="text-2xl mr-2">🌟</span>
            Lợi ích của massage mặt
          </h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded-lg text-center">
              <div class="text-3xl mb-2">🩸</div>
              <h4 class="font-semibold text-blue-700 mb-1">Lưu thông máu</h4>
              <p class="text-blue-600 text-sm">Kích thích tuần hoàn máu</p>
            </div>
            <div class="bg-white p-4 rounded-lg text-center">
              <div class="text-3xl mb-2">✨</div>
              <h4 class="font-semibold text-blue-700 mb-1">Tăng collagen</h4>
              <p class="text-blue-600 text-sm">Thúc đẩy sản sinh collagen</p>
            </div>
            <div class="bg-white p-4 rounded-lg text-center">
              <div class="text-3xl mb-2">🌸</div>
              <h4 class="font-semibold text-blue-700 mb-1">Làm sáng da</h4>
              <p class="text-blue-600 text-sm">Da sáng khỏe tự nhiên</p>
            </div>
          </div>
        </div>

        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
          <h3 class="text-lg font-semibold text-green-800 mb-4">Chuẩn bị trước khi massage</h3>
          <div class="space-y-3">
            <div class="flex items-start">
              <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
              <p class="text-green-700">Rửa tay và làm sạch da mặt</p>
            </div>
            <div class="flex items-start">
              <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
              <p class="text-green-700">Sử dụng serum hoặc dầu dưỡng để tạo độ trơn</p>
            </div>
            <div class="flex items-start">
              <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
              <p class="text-green-700">Chuẩn bị công cụ: đầu ngón tay, gua sha hoặc thanh lăn đá</p>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-6 rounded-lg mb-6">
          <h3 class="text-lg font-semibold text-purple-800 mb-4">Kỹ thuật massage hiệu quả</h3>
          <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg border-l-4 border-purple-400">
              <h4 class="font-semibold text-purple-700 mb-2 flex items-center">
                <span class="text-xl mr-2">↗️</span>
                Nâng cơ mặt
              </h4>
              <p class="text-purple-600">Vuốt nhẹ từ cằm lên đến thái dương để nâng cơ mặt</p>
            </div>
            <div class="bg-white p-4 rounded-lg border-l-4 border-indigo-400">
              <h4 class="font-semibold text-indigo-700 mb-2 flex items-center">
                <span class="text-xl mr-2">👁️</span>
                Vùng mắt
              </h4>
              <p class="text-indigo-600">Massage quanh vùng mắt theo hình vòng cung để giảm bọng mắt và quầng thâm</p>
            </div>
            <div class="bg-white p-4 rounded-lg border-l-4 border-pink-400">
              <h4 class="font-semibold text-pink-700 mb-2 flex items-center">
                <span class="text-xl mr-2">👆</span>
                Giảm căng thẳng
              </h4>
              <p class="text-pink-600">Day ấn nhẹ vùng trán, hai bên mũi và dưới xương gò má</p>
            </div>
          </div>
        </div>

        <div class="bg-amber-50 border-2 border-amber-200 p-6 rounded-lg mb-6">
          <h3 class="text-lg font-semibold text-amber-800 mb-3 flex items-center">
            <span class="text-2xl mr-2">⏰</span>
            Thời gian và tần suất
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-amber-700 mb-2">Thời gian</h4>
              <p class="text-amber-600"><span class="bg-amber-200 px-2 py-1 rounded">5–10 phút</span> mỗi lần massage</p>
            </div>
            <div class="bg-white p-4 rounded-lg">
              <h4 class="font-semibold text-amber-700 mb-2">Tần suất</h4>
              <p class="text-amber-600"><span class="bg-amber-200 px-2 py-1 rounded">3–4 lần/tuần</span> đều đặn</p>
            </div>
          </div>
        </div>

        <div class="bg-teal-50 border-l-4 border-teal-400 p-6 mb-6">
          <h3 class="text-lg font-semibold text-teal-800 mb-3">Sau khi massage</h3>
          <p class="text-teal-700">
            Lau sạch phần dầu thừa và tiếp tục chu trình dưỡng da với kem dưỡng hoặc mặt nạ ngủ.
          </p>
        </div>

        <div class="bg-gradient-to-r from-rose-100 to-pink-100 p-6 rounded-lg">
          <h3 class="text-lg font-semibold text-rose-800 mb-3 text-center">Lợi ích bổ sung</h3>
          <p class="text-rose-700 text-center">
            Ngoài tác dụng làm đẹp, việc massage mặt thường xuyên còn giúp bạn cảm thấy thư thái, cải thiện tâm trạng và giấc ngủ. Đây là thói quen nhỏ nhưng mang lại lợi ích lớn, đặc biệt cho những ai đang đối mặt với áp lực công việc hay lão hóa da.
          </p>
        </div>
      </div>
    `,
    date: new Date("2025-02-05"),
    images: [blog9a, blog9b],
  },
  {
    id: 10,
    title: "Bí quyết chăm sóc da body trắng hồng tự nhiên tại nhà",
    subTitle:
      "Từ làm sạch đến dưỡng trắng – quy trình chăm sóc da body tại nhà",
    content: `<div className="prose lg:prose-lg max-w-none text-gray-700">
  <p>
    Không chỉ da mặt, làn da toàn thân cũng cần được chăm sóc kỹ lưỡng để duy trì vẻ trắng hồng và khỏe mạnh. Dưới đây là bí quyết giúp bạn dưỡng da body hiệu quả ngay tại nhà.
  </p>

  <ol className="list-decimal list-inside space-y-4 mt-4">
    <li class="py-2">
      <strong>Làm sạch sâu mỗi ngày:</strong> Sử dụng sữa tắm có thành phần dịu nhẹ, chứa chiết xuất thiên nhiên như trà xanh, nha đam, hoặc sữa gạo giúp làm sạch mà không gây khô da. Vào mùa nóng, nên tắm 2 lần/ngày để loại bỏ mồ hôi và bụi bẩn.
    </li>
    <li class="py-2">
      <strong>Tẩy tế bào chết 2 lần/tuần:</strong> Kết hợp tẩy da chết bằng scrub từ thiên nhiên như cà phê, đường nâu hoặc muối biển giúp loại bỏ lớp da xỉn màu và kích thích tái tạo tế bào mới.
    </li>
    <li class="py-2">
      <strong>Dưỡng trắng đều đặn:</strong> Sau khi tắm, thoa lotion hoặc body serum có chứa vitamin C, niacinamide hoặc glutathione giúp làm sáng da và đều màu. Nên dưỡng khi da còn ẩm để tăng khả năng thẩm thấu.
    </li>
    <li class="py-2">
      <strong>Bảo vệ da khỏi ánh nắng:</strong> Dù chỉ ra ngoài trong thời gian ngắn, việc thoa kem chống nắng toàn thân là vô cùng quan trọng. Lựa chọn loại SPF từ 30 trở lên, chống nước tốt để bảo vệ da khỏi tác hại của tia UV.
    </li>
    <li class="py-2">
      <strong>Chế độ ăn uống và sinh hoạt hợp lý:</strong> Uống đủ nước, ăn nhiều rau xanh và ngủ đủ giấc là yếu tố hỗ trợ làn da khỏe mạnh từ bên trong.
    </li>
  </ol>

  <p className="mt-6 font-semibold text-pink-600">
    Với sự kiên trì và chăm sóc đúng cách, bạn hoàn toàn có thể sở hữu làn da body trắng hồng tự nhiên, đều màu và mịn màng như mong đợi.
  </p>
</div>
`,
    date: new Date("2025-02-17"),
    images: [blog10a, blog10b],
  },
];
